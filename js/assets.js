// 仅登记用户已验收的V3.2体式。首批三张正式图片已接入 assets/liny/。
// 对缺失文件自动回退为占位，不使用第三方图片冒充官方母版。
export const linyAssets = {
 'tadasana':{version:'V3.2',review:'approved',image:'assets/liny/tadasana.webp'},
 'vrksasana':{version:'V3.2',review:'approved',image:'assets/liny/vrksasana.webp'},
 'virabhadrasana-ii':{version:'V3.2',review:'approved',image:'assets/liny/virabhadrasana-ii.webp'}
};
const states = new WeakMap();
export function createPoseAsset(pose, container){
 const key=pose?.id || '';
 if(states.get(container)?.key===key) return;
 const state={key}; states.set(container,state);
 const entry=linyAssets[key];
 const placeholder=document.createElement('div');
 placeholder.className='asset-placeholder';
 placeholder.textContent=entry?'正在加载 Liny 素材…':'该体式尚无已审核 Liny 素材';
 container.replaceChildren(placeholder);
 if(!entry || entry.review!=='approved') return;
 const img=new Image(); img.alt=`零 Liny · ${pose.name} · ${entry.version}`;
 img.decoding='async';
 img.onload=()=>{if(states.get(container)===state) container.replaceChildren(img)};
 img.onerror=()=>{if(states.get(container)===state) placeholder.textContent='Liny V3.2 已验收 · 图片待接入或加载失败'};
 img.src=entry.image;
}
