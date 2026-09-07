"use client";

import { useEffect, useRef } from "react";

const VERT = `#version 300 es
in vec2 pos;
void main() { gl_Position = vec4(pos, 0.0, 1.0); }`;

const FRAG = `#version 300 es
precision highp float;
out vec4 fragColor;

uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_scroll;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x),
             mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.02; a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
  vec2 m = u_mouse * 0.06;
  vec3 col = vec3(0.014, 0.018, 0.036);

  // туманность
  float n = fbm(uv * 1.6 + vec2(u_time * 0.02, u_scroll * 0.3) + m);
  col += vec3(0.10, 0.05, 0.30) * pow(n, 3.0) * 1.5;
  col += vec3(0.0, 0.22, 0.34) * pow(fbm(uv * 2.4 - u_time * 0.015 + m), 4.0);

  // звёздное поле
  vec2 sp = uv * vec2(u_res.y / u_res.x, 1.0) * 90.0 + m * 40.0;
  float st = hash(floor(sp));
  if (st > 0.985) {
    float d = length(fract(sp) - 0.5);
    float tw = 0.6 + 0.4 * sin(u_time * 2.0 + st * 40.0);
    col += vec3(0.7, 0.85, 1.0) * smoothstep(0.42, 0.0, d) * tw * 0.9;
  }

  // уходящая к горизонту сетка
  float horizon = -0.06 + m.y * 0.5;
  if (uv.y < horizon) {
    float depth = 1.0 / (horizon - uv.y + 0.0001);
    vec2 g = vec2(uv.x * depth * 0.9 + m.x * 2.0, depth * 0.6 + u_time * 0.35 + u_scroll * 4.0);
    vec2 gr = abs(fract(g) - 0.5);
    float line = min(gr.x, gr.y);
    float w = fwidth(line) * 1.6 + 0.002;
    float grid = smoothstep(w, 0.0, line - 0.005);
    float fade = exp(-depth * 0.13);
    col += mix(vec3(0.20, 0.85, 1.0), vec3(0.55, 0.35, 1.0), clamp(depth * 0.05, 0.0, 1.0))
         * grid * fade * 0.9;
  }

  // свечение линии горизонта
  col += vec3(0.15, 0.5, 0.8) * exp(-abs(uv.y - horizon) * 22.0) * 0.35;

  // виньетка
  col *= 1.0 - 0.5 * pow(length(uv * vec2(0.8, 1.0)), 2.2);

  fragColor = vec4(col, 1.0);
}`;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(sh));
    return null;
  }
  return sh;
}

export default function Backdrop() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const gl = canvas.getContext("webgl2", { antialias: false, alpha: false });
    // Без WebGL2 остаётся CSS-градиент под канвасом — сайт не ломается.
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uScroll = gl.getUniformLocation(prog, "u_scroll");

    // Целевые и сглаженные значения мыши — курсор тянет камеру с инерцией.
    const target = { x: 0, y: 0 };
    const smooth = { x: 0, y: 0 };
    let scroll = 0;

    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = 1 - (e.clientY / window.innerHeight) * 2;
    };
    const onScroll = () => {
      scroll = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };

    resize();
    onScroll();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    let raf = 0;
    const start = performance.now();

    const frame = (now: number) => {
      smooth.x += (target.x - smooth.x) * 0.045;
      smooth.y += (target.y - smooth.y) * 0.045;
      gl.uniform1f(uTime, reduced ? 0 : (now - start) / 1000);
      gl.uniform2f(uMouse, smooth.x, smooth.y);
      gl.uniform1f(uScroll, scroll);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    // Вкладка не на виду — не жжём батарею.
    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(frame);
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_65%,#0d1c3a_0%,#04050a_70%)]" />
      <canvas ref={ref} className="absolute inset-0 h-full w-full" />
      <div className="mesh absolute inset-0 opacity-25" />
      <div
        className="absolute inset-0 opacity-[0.13]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(255,255,255,0.5) 0 1px, transparent 1px 3px)",
        }}
      />
    </div>
  );
}
