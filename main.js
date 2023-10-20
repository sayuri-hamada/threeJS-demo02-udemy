import './style.css'
import * as THREE from 'three';


// canvas
const canvas = document.querySelector('#webgl');

// シーン
const scene = new THREE.Scene();

// 背景用のテクスチャ
const textureLoader = new THREE.TextureLoader();
const bgTexture = textureLoader.load('bg/scene-bg.jpg');

scene.background = bgTexture;

// サイズ
const sizes = {
  width: innerWidth,
  height: innerHeight
}

// カメラ
const camera = new THREE.PerspectiveCamera(
  75, //視野角
  sizes.width / sizes.height, //アスペクト比
  0.1, //near
  1000 //far
)

// レンダラー
const renderer = new THREE.WebGL1Renderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio); //荒さを軽減

// オブジェクトを作成
const boxGeometry = new THREE.BoxGeometry(5, 5, 5, 10);
const boxMaterial = new THREE.MeshNormalMaterial();
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.set(0, 0.5, -15);
box.rotation.set(1, 1, 0);

scene.add(box);


const tourusGeometry = new THREE.TorusGeometry(8, 2, 16, 100);
const tourusMaterial = new THREE.MeshNormalMaterial();
const tourus = new THREE.Mesh(tourusGeometry, tourusMaterial);
tourus.position.set(0, 1, 10);

scene.add(tourus);

// スクロールアニメーション
const animationScripts = [];

animationScripts.push({
  start: 0,
  end: 40,
  function() {
    camera.lookAt(box.position);
    camera.position.set(0, 1, 10);
    box.position.z += 0.01;
  }
})

function playScrollAnimation() {
  animationScripts.forEach(animation => {
    animation.function();
  })
}

// ブラウザのスクロール率を取得
let scrollParcent = 0;

document.body.onscroll = () => {
  scrollParcent = (document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100;

  console.log(scrollParcent);
}

// アニメーション
const tick = () => {
  window.requestAnimationFrame(tick);
  playScrollAnimation();
  renderer.render(scene, camera);
}

tick();

// ブラウザのリサイズ操作
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(window.devicePixelRatio);
})
