precision highp float;

uniform float uChromaticPower; // 색수차 강도

in vec3 vColor;
in vec2 vUv;

out vec4 fragColor;

void main() {
  // 1. 원형 모양 생성
  vec2 coord = gl_PointCoord - vec2(0.5);
  float strength = 1.0 - length(coord) * 2.0;
  strength = smoothstep(0.3, 0.5, strength);

  // 2. 색수차 효과 없이 단순히 vColor 사용
  vec3 finalColor = vColor;

  // 3. 블룸 효과 강화
  float bloom = smoothstep(0.2, 1.0, strength);
  finalColor += vec3(bloom * 0.5);

  // 4. 최종 색상 결합 및 알파 적용
  fragColor = vec4(vColor * finalColor, strength);
  
  // 5. HDR 처리 (밝기 재현)
  fragColor.rgb *= 2.0;
}