
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Medal Factory | Live Production</title>
<style>
*{box-sizing:border-box}
body{margin:0;background:#090c10;color:#edf3fa;font-family:Arial,sans-serif;overflow:hidden}
#factory{position:fixed;inset:0}
canvas{display:block}
.hud{position:fixed;top:14px;left:50%;transform:translateX(-50%);width:min(1180px,96vw);
display:grid;grid-template-columns:1fr 1.5fr 1fr;gap:10px;pointer-events:none}
.panel{background:rgba(10,16,23,.91);border:1px solid #526170;border-radius:8px;
box-shadow:0 8px 30px #0008;padding:12px;backdrop-filter:blur(8px)}
.brand{font-size:20px;font-weight:800;letter-spacing:2px}
.sub{font-size:10px;color:#91a6ba;letter-spacing:2px;margin-top:4px}
.section{font-size:10px;color:#9eb2c5;letter-spacing:1.5px;margin-bottom:10px}
.gift{display:flex;align-items:center;gap:9px;margin:8px 0;font-size:12px}
.avatar{width:34px;height:34px;border-radius:50%;border:2px solid #8ba9c7;object-fit:cover;background:#283746}
.giftinfo{flex:1}.muted{color:#93a3b2;font-size:10px;margin-top:3px}
.progress{height:7px;background:#26323e;border-radius:9px;overflow:hidden;margin:10px 0}
#bar{height:100%;width:40%;background:linear-gradient(90deg,#27b6e8,#b4f5ff);transition:width .5s}
.stages{display:flex;justify-content:space-between;color:#9fb2c2;font-size:9px;gap:4px}
.stages span.active{color:#7ce4ff}
.medalpreview{display:flex;align-items:center;gap:10px}
.coin{width:64px;height:64px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#f4e3a0,#a87c29 48%,#392710 72%,#d5ae52);
border:4px ridge #d8bd72;box-shadow:0 0 20px #d9aa4c55;display:grid;place-items:center;
color:#281d0b;font-size:11px;font-weight:bold;text-align:center}
.tiers{display:grid;grid-template-columns:1fr 1fr;gap:6px}
.tier{border:1px solid #374756;border-radius:5px;padding:7px;font-size:11px;background:#111a23}
.tier b{display:block;font-size:10px;margin-bottom:3px}
.elite{color:#ffd875}.pro{color:#f4d8a0}.plus{color:#c8d6e5}.base{color:#d79c72}
.bottom{position:fixed;bottom:14px;left:50%;transform:translateX(-50%);width:min(900px,94vw);
display:flex;align-items:center;justify-content:space-between;gap:12px;pointer-events:none}
.status{background:#0c141cdd;border:1px solid #34495b;border-radius:6px;padding:10px 14px;font-size:11px}
.liveDot{display:inline-block;width:7px;height:7px;border-radius:50%;background:#54e39a;margin-right:7px;box-shadow:0 0 10px #54e39a}
#event{color:#8ce7ff}
@media(max-width:760px){
 .hud{top:6px;grid-template-columns:1fr 1fr;width:98vw;gap:5px}
 .panel{padding:8px}.brand{font-size:14px}.sub{font-size:8px}
 .hud .tiersPanel{display:none}.gift{margin:4px 0}.avatar{width:26px;height:26px}
 .coin{width:45px;height:45px}.bottom{bottom:5px}.status{padding:7px;font-size:9px}
}
</style>
</head>
<body>
<div id="factory"></div>

<div class="hud">
 <section class="panel">
  <div class="brand">MEDAL FACTORY</div>
  <div class="sub">AUTOMATED LIVE PRODUCTION</div>
  <div style="height:12px"></div>
  <div class="section">RECENT GIFTS</div>
  <div class="gift">
   <img class="avatar" src="https://i.pravatar.cc/80?img=12" alt="Demo profile">
   <div class="giftinfo"><b>Marco_08</b><div class="muted">Rose · x1</div></div>
   <span>🌹</span>
  </div>
  <div class="gift">
   <img class="avatar" src="https://i.pravatar.cc/80?img=47" alt="Demo profile">
   <div class="giftinfo"><b>Auri.17</b><div class="muted">Heart · x10</div></div>
   <span>♥</span>
  </div>
  <div class="gift">
   <img class="avatar" src="https://i.pravatar.cc/80?img=13" alt="Demo profile">
   <div class="giftinfo"><b>LucaTV</b><div class="muted">TikTok · x1</div></div>
   <span>♪</span>
  </div>
 </section>

 <section class="panel">
  <div class="section">CURRENT ORDER</div>
  <div class="medalpreview">
   <img class="avatar" src="https://i.pravatar.cc/100?img=12" alt="Current user">
   <div style="flex:1">
    <div style="font-size:16px;font-weight:bold">Marco_08</div>
    <div class="muted">Rose · Personalized medal</div>
   </div>
   <div class="coin">MARCO<br>08</div>
  </div>
  <div class="progress"><div id="bar"></div></div>
  <div class="stages">
   <span id="s0" class="active">01 DISC FEED</span>
   <span id="s1">02 LASER</span>
   <span id="s2">03 3D PRINT</span>
   <span id="s3">04 COLOR</span>
   <span id="s4">05 STORAGE</span>
  </div>
 </section>

 <section class="panel tiersPanel">
  <div class="section">MEDAL COLLECTION</div>
  <div class="tiers">
   <div class="tier"><b class="elite">◆ ELITE</b>Premium</div>
   <div class="tier"><b class="pro">★ PRO</b>Gold</div>
   <div class="tier"><b class="plus">● PLUS</b>Silver</div>
   <div class="tier"><b class="base">○ BASE</b>Bronze</div>
  </div>
  <div class="muted" style="margin-top:12px">MEDALS CREATED: <b id="total">0248</b></div>
 </section>
</div>

<div class="bottom">
 <div class="status"><span class="liveDot"></span>PRODUCTION LINE ONLINE</div>
 <div class="status" id="event">ROBOT ARM: STANDBY</div>
 <div class="status">CAM 01 · FACTORY FLOOR</div>
</div>

<script type="module">
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.module.js';

const root = document.getElementById('factory');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x10161c);
scene.fog = new THREE.Fog(0x10161c, 19, 42);

const camera = new THREE.PerspectiveCamera(42, innerWidth / innerHeight, 0.1, 100);
camera.position.set(0, 10, 23);
camera.lookAt(0, 2.1, 0);

const renderer = new THREE.WebGLRenderer({antialias:true, powerPreference:'high-performance'});
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.7));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
root.appendChild(renderer.domElement);

scene.add(new THREE.HemisphereLight(0xcbd9e8, 0x24282c, 2.0));
const key = new THREE.DirectionalLight(0xffe0b0, 3.2);
key.position.set(-5, 12, 8); key.castShadow = true; scene.add(key);
const blue = new THREE.PointLight(0x369cff, 45, 18);
blue.position.set(0, 4, -2); scene.add(blue);
const warm = new THREE.PointLight(0xff963d, 38, 16);
warm.position.set(-5, 3, -1); scene.add(warm);

const mat = (color, metalness=0, roughness=.5, extra={}) =>
 new THREE.MeshStandardMaterial({color, metalness, roughness, ...extra});

const steel = mat(0x697782,.85,.29);
const darkSteel = mat(0x222a31,.75,.35);
const aluminum = mat(0xb4bec5,.8,.25);
const black = mat(0x10151a,.35,.45);
const glass = new THREE.MeshPhysicalMaterial({color:0x9fc7d9,metalness:.1,roughness:.12,
 transparent:true,opacity:.13,transmission:.12});
const floorMat = mat(0x20272d,.55,.55);
const rubber = mat(0x171b1f,.1,.85);
const blueMat = mat(0x168dce,.5,.25,{emissive:0x063b65,emissiveIntensity:.7});
const orangeMat = mat(0xff7a20,.35,.25,{emissive:0x6c2100,emissiveIntensity:.6});

function box(w,h,d,material,x,y,z, parent=scene) {
 const m = new THREE.Mesh(new THREE.BoxGeometry(w,h,d), material);
 m.position.set(x,y,z); m.castShadow=true; m.receiveShadow=true; parent.add(m); return m;
}
function cylinder(r1,r2,h,material,x,y,z,parent=scene,segments=32) {
 const m = new THREE.Mesh(new THREE.CylinderGeometry(r1,r2,h,segments),material);
 m.position.set(x,y,z); m.castShadow=true; m.receiveShadow=true; parent.add(m); return m;
}
function sphere(r,material,x,y,z,parent=scene) {
 const m = new THREE.Mesh(new THREE.SphereGeometry(r,20,14),material);
 m.position.set(x,y,z); m.castShadow=true; parent.add(m); return m;
}
function lineBetween(a,b,r,material,parent=scene) {
 const diff = new THREE.Vector3().subVectors(b,a);
 const m = new THREE.Mesh(new THREE.CylinderGeometry(r,r,diff.length(),12),material);
 m.position.copy(a).add(b).multiplyScalar(.5);
 m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),diff.normalize());
 m.castShadow=true; parent.add(m); return m;
}

// Factory floor, markings and background structure.
box(32,.35,17,floorMat,0,-.28,0);
for(let i=-15;i<=15;i+=2){
 box(.025,.008,16,mat(0x53606a,.2,.8),i,-.09,0);
}
for(let z=-7;z<=7;z+=2){
 box(31,.012,.025,mat(0x39464e,.2,.8),0,-.08,z);
}
for(let x=-14;x<=14;x+=4){
 box(.12,7,.12,steel,x,3.4,-6.3);
 box(.12,.12,13,steel,x,6.8,0);
}
box(31,.18,.2,aluminum,0,6.85,-6.3);
box(31,.18,.2,aluminum,0,6.85,6.3);

// Conveyor line.
box(20,.45,2.2,darkSteel,0,.5,0);
box(19.6,.12,1.8,rubber,0,.79,0);
for(let x=-9.5;x<=9.5;x+=.55){
 cylinder(.11,.11,1.72,steel,x,.78,0,scene,12).rotation.z=Math.PI/2;
}
for(const z of [-1.02,1.02]){
 box(20,.15,.13,aluminum,0,.94,z);
}
for(let x=-9;x<=9;x+=1.5){
 cylinder(.17,.17,.12,black,x,.24,1.18,scene,16).rotation.z=Math.PI/2;
 cylinder(.17,.17,.12,black,x,.24,-1.18,scene,16).rotation.z=Math.PI/2;
}

// Five enclosed work cells.
const stationX=[-7,-3.5,0,3.5,7];
const stationNames=['DISC FEED','LASER ENGRAVE','3D PRINT','COLOR COAT','MEDAL STORAGE'];
for(let i=0;i<5;i++){
 const x=stationX[i];
 box(3,.12,3.5,darkSteel,x,1.12,-1.35);
 for(const dx of [-1.42,1.42]){
  box(.09,2.7,.1,aluminum,x+dx,2.48,-1.35);
  box(.09,2.7,.1,aluminum,x+dx,2.48,1.25);
 }
 for(const z of [-1.35,1.25]){
  box(2.9,.09,.09,aluminum,x,3.83,z);
  box(2.9,.09,.09,steel,x,1.18,z);
 }
 box(2.7,2.35,.035,glass,x,2.48,-1.32);
 box(2.7,2.35,.035,glass,x,2.48,1.23);
 box(2.8,.42,.16,black,x,3.35,-1.39);
 box(2.2,.045,.06,i===1?orangeMat:blueMat,x,3.13,-1.29);
 const label = new THREE.Mesh(new THREE.BoxGeometry(2.65,.32,.08),black);
 label.position.set(x,3.4,-1.2); scene.add(label);
 // Simple mechanical tooling inside each station.
 if(i===0){
  cylinder(.8,.8,.2,steel,x,1.35,-.1);
  cylinder(.64,.64,.12,aluminum,x,1.51,-.1);
  for(let j=0;j<9;j++){
   const a=j*Math.PI*2/9;
   cylinder(.06,.06,.12,orangeMat,x+Math.cos(a)*.48,1.63,-.1+Math.sin(a)*.48);
  }
 } else if(i===1){
  box(.55,.6,.6,darkSteel,x,2.95,-.15);
  box(.12,.5,.12,orangeMat,x,2.55,-.15);
 } else if(i===2){
  box(.95,.65,.75,steel,x,2.8,-.15);
  box(.12,.55,.12,aluminum,x,2.4,-.15);
  box(.8,.08,.8,blueMat,x,1.75,-.15);
 } else if(i===3){
  for(let j=0;j<3;j++){
   cylinder(.09,.13,.7,[orangeMat,blueMat,mat(0x9e49da,.4,.25)][j],x-.65+j*.65,2.8,-.15);
  }
 } else {
  box(2.5,.1,2.4,steel,x,1.55,-.1);
 }
}

// Storage shelves with separate rarity levels.
const sx=9.5;
for(let level=0;level<4;level++){
 const y=1.5+level*1.05;
 box(2.8,.1,2.2,steel,sx,y,-.2);
 box(2.8,.09,.1,aluminum,sx,y+.08,.9);
 const tierColors=[0xb77b42,0xc0c9d3,0xe3b74f,0x7ed7ff];
 const coinMat=mat(tierColors[level],.92,.22,{emissive:tierColors[level],emissiveIntensity:.07});
 for(let j=0;j<4;j++){
  const c=cylinder(.28,.28,.07,coinMat,sx-1+j*.66,y+.27,-.35,scene,40);
  c.rotation.x=.1;
  cylinder(.22,.22,.018,mat(0x29313a,.85,.2),sx-1+j*.66,y+.32,-.35,scene,32);
 }
}
box(3.1,4.5,.18,darkSteel,sx,3.3,-1.25);
for(let level=0;level<4;level++){
 box(2.8,.06,.06,aluminum,sx,1.5+level*1.05,-1.12);
}

// Realistic articulated industrial robot arm, built from jointed segments.
const robotBase=new THREE.Vector3(-.2,.95,1.65);
cylinder(.75,.85,.3,darkSteel,robotBase.x,.12,robotBase.z);
cylinder(.5,.62,.55,orangeMat,robotBase.x,.5,robotBase.z);
cylinder(.35,.4,.28,steel,robotBase.x,.87,robotBase.z);
const upper=lineBetween(new THREE.Vector3(0,1,0),new THREE.Vector3(0,2,0),.24,orangeMat);
const fore=lineBetween(new THREE.Vector3(0,1,0),new THREE.Vector3(0,2,0),.17,orangeMat);
const wrist=sphere(.25,steel,0,0,0);
const clawA=box(.09,.42,.12,aluminum,0,0,0);
const clawB=box(.09,.42,.12,aluminum,0,0,0);
const robotLight=sphere(.07,blueMat,0,0,0);
function orientSegment(mesh,a,b){
 const diff=new THREE.Vector3().subVectors(b,a);
 mesh.position.copy(a).add(b).multiplyScalar(.5);
 mesh.scale.y=diff.length()/1;
 mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),diff.clone().normalize());
}

// Medals with metallic rims and an embossed central mark.
const medalMaterials=[
 mat(0xb77b42,.94,.24),mat(0xc5cbd1,.95,.2),
 mat(0xe6bd55,.92,.19),mat(0x75d9f6,.8,.16,{emissive:0x16506a,emissiveIntensity:.35})
];
function makeMedal(material,index){
 const group=new THREE.Group();
 const disc=cylinder(.39,.39,.095,material,0,0,0,group,48);
 disc.rotation.x=0;
 const rim=new THREE.Mesh(new THREE.TorusGeometry(.34,.035,10,48),aluminum);
 rim.rotation.x=Math.PI/2; rim.position.y=.06; group.add(rim);
 const inner=new THREE.Mesh(new THREE.TorusGeometry(.23,.012,8,36),mat(0xf0e1bd,.85,.2));
 inner.rotation.x=Math.PI/2; inner.position.y=.065; group.add(inner);
 const dot=sphere(.055,mat(0x20262b,.8,.25),0,.075,0,group);
 for(let i=0;i<8;i++){
  const a=i*Math.PI/4;
  sphere(.025,aluminum,Math.cos(a)*.29,.065,Math.sin(a)*.29,group);
 }
 group.userData={disc,index};
 return group;
}

// Moving workpieces on the conveyor.
const pieces=[];
for(let i=0;i<8;i++){
 const group=makeMedal(medalMaterials[i%4],i%4);
 group.position.set(-9+i*2.5,1.06,.05);
 scene.add(group);
 pieces.push(group);
}
const currentMedal=makeMedal(medalMaterials[1],1);
currentMedal.position.set(-3.5,1.12,-.15);
scene.add(currentMedal);

// Safety barriers, floor bolts and industrial details.
for(const x of [-9.5,-6,-2,2,6,9.5]){
 for(const z of [-1.16,1.16]){
  cylinder(.055,.055,.035,aluminum,x,.99,z,scene,12);
 }
}
for(let i=0;i<12;i++){
 const x=-10+i*1.8;
 box(.035,1.5,.035,blueMat,x,1.1,2.8);
}
const dust=[];
for(let i=0;i<45;i++){
 const p=sphere(.018,mat(0xa8c8dc,.1,.7,{transparent:true,opacity:.28}),
 (Math.random()-.5)*23,Math.random()*5,(Math.random()-.5)*9);
 dust.push(p);
}

// Animation state.
let time=0;
let orderProgress=0;
let created=248;
const eventText=document.getElementById('event');
const bar=document.getElementById('bar');
const total=document.getElementById('total');
const stageIds=['s0','s1','s2','s3','s4'];
function animate(){
 requestAnimationFrame(animate);
 time+=.008;
 // Slow conveyor motion: medals travel continuously through the line.
 pieces.forEach((p,i)=>{
  p.position.x+=.012+(i%3)*.002;
  if(p.position.x>9.2)p.position.x=-9.2;
  p.rotation.y=Math.sin(time*1.4+i)*.04;
  p.position.y=1.06+Math.sin(time*2+i)*.018;
 });
 // The robotic arm reaches between the production stations.
 const phase=(time*.17)%(Math.PI*2);
 const target=new THREE.Vector3(
  -3.2+Math.sin(phase)*3.7,
  2.35+Math.sin(phase*2)*.45,
  .8+Math.cos(phase)*.65
 );
 const elbow=new THREE.Vector3(
  -.2+Math.sin(phase)*1.15,
  2.55+Math.sin(phase*1.3)*.45,
  1.5
 );
 const base=new THREE.Vector3(robotBase.x,1.02,robotBase.z);
 orientSegment(upper,base,elbow);
 orientSegment(fore,elbow,target);
 wrist.position.copy(target);
 clawA.position.set(target.x-.09,target.y-.26,target.z);
 clawB.position.set(target.x+.09,target.y-.26,target.z);
 clawA.rotation.z=Math.sin(phase)*.12;
 clawB.rotation.z=-Math.sin(phase)*.12;
 robotLight.position.set(target.x,target.y+.22,target.z);
 // Current order advances through the five stations.
 orderProgress=(orderProgress+.0018)%1;
 const percent=Math.floor(orderProgress*100);
 bar.style.width=percent+'%';
 const active=Math.min(4,Math.floor(orderProgress*5));
 stageIds.forEach((id,i)=>{
  document.getElementById(id).classList.toggle('active',i===active);
 });
 currentMedal.position.set(stationX[active],1.65,-.15);
 currentMedal.rotation.y=time*.35;
 if(Math.floor(time*10)%80===0){
  eventText.textContent='ROBOT ARM: MOVING';
 } else if(Math.floor(time*10)%80===40){
  eventText.textContent='LASER SYSTEM: READY';
 }
 total.textContent=String(created+Math.floor(time/30)).padStart(4,'0');
 dust.forEach((p,i)=>{p.position.y+=.0015;if(p.position.y>5)p.position.y=.3;});
 blue.intensity=38+Math.sin(time*2)*5;
 warm.intensity=32+Math.sin(time*1.5)*5;
 renderer.render(scene,camera);
}
animate();

window.addEventListener('resize',()=>{
 camera.aspect=innerWidth/innerHeight;
 camera.updateProjectionMatrix();
 renderer.setSize(innerWidth,innerHeight);
});
</script>
</body>
</html>`);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("Medal Factory running on port " + PORT);
});
