precision highp float;

uniform float uTime;               // 시간 유니폼
uniform float uChromaticPower;     // 색수차 강도

// Three.js 기본 변수는 이미 제공됨:
// - in vec3 position;
// - in vec2 uv;
// - uniform mat4 projectionMatrix;
// - uniform mat4 modelViewMatrix;

in vec3 color;                     // 개별 입자 색상
in float aScale;                   // 개별 입자 스케일

out vec3 vColor;                   // 프래그먼트 셰이더로 전달할 색상
out vec2 vUv;                      // UV 좌표 전달

void main() {
  vColor = color;
  vUv = uv;

  vec3 pos = position;
  float timeFactor = pow(0.5, uTime);
  
  // Z축 위치 업데이트
  if (pos.z > 7.0) {
    pos.z = -4.0;
  } else {
    pos.z += max(0.01, timeFactor * 2.0);
  }

  // 크기 조정 (시간에 따라 점점 커짐)
  gl_PointSize = 2.0 * aScale * max(1.0, timeFactor * 100.0);

  // 최종 위치 계산 (Three.js가 제공하는 projectionMatrix, modelViewMatrix 사용)
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}