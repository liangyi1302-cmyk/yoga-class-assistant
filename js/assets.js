// 仅登记用户已验收的V3.2体式。正式图片文件需自行放入 assets/liny/。
// 对缺失文件自动回退为占位，不使用第三方图片冒充官方母版。
export const linyAssets = {
  tadasana: {
    version: "V3.2",
    review: "approved",
    image: "assets/liny/tadasana.png",
  },
  vrksasana: {
    version: "V3.2",
    review: "approved",
    image: "assets/liny/vrksasana.png",
  },
  "virabhadrasana-ii": {
    version: "V3.2",
    review: "approved",
    image: "assets/liny/virabhadrasana-ii.png",
  },
};
export function createPoseAsset(pose, container) {
  container.replaceChildren();
  const entry = pose && linyAssets[pose.id];
  const fallback = () => {
    container.replaceChildren();
    const el = document.createElement("div");
    el.className = "asset-placeholder";
    el.textContent = entry
      ? "Liny V3.2 已验收 · 图片待接入"
      : "该体式尚无已审核 Liny 素材";
    container.append(el);
  };
  if (!entry || entry.review !== "approved") {
    fallback();
    return;
  }
  const img = new Image();
  img.alt = `零 Liny · ${pose.name} · ${entry.version}`;
  img.onload = () => {
    container.replaceChildren(img);
  };
  img.onerror = fallback;
  img.src = entry.image;
}
