/** Expanded mode shares the preview dialog and its current carousel index. */
export function setupImageViewer(
  dialog: HTMLDialogElement,
  slides: HTMLElement[],
  current: () => number,
  signal: AbortSignal,
) {
  const panel = dialog.querySelector<HTMLElement>('.teaser-panel')!;
  const viewer = dialog.querySelector<HTMLElement>('.image-viewer')!;
  const stage = viewer.querySelector<HTMLElement>('.image-viewer-stage')!;
  const image = viewer.querySelector<HTMLImageElement>('.image-viewer-image')!;
  const status = viewer.querySelector<HTMLElement>('.image-viewer-status')!;
  const back = viewer.querySelector<HTMLButtonElement>('.image-viewer-back')!;
  const caption = viewer.querySelector<HTMLElement>('.image-viewer-caption')!;
  const count = viewer.querySelector<HTMLElement>('.image-viewer-count')!;
  const zoomIn = viewer.querySelector<HTMLButtonElement>('[data-zoom="in"]')!;
  const zoomOut = viewer.querySelector<HTMLButtonElement>('[data-zoom="out"]')!;
  const reset = viewer.querySelector<HTMLButtonElement>('[data-zoom="reset"]')!;
  let scale = 1;
  let x = 0;
  let y = 0;
  let width = 0;
  let height = 0;
  let scrollTop = 0;
  let ready = false;
  const pointers = new Map<number, { x: number; y: number }>();
  const isOpen = () => !viewer.hidden;
  const clamp = (value: number, limit: number) => Math.max(-limit, Math.min(limit, value));

  function paint() {
    x = clamp(x, Math.max(0, (width * scale - stage.clientWidth) / 2));
    y = clamp(y, Math.max(0, (height * scale - stage.clientHeight) / 2));
    image.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
    stage.classList.toggle('is-zoomed', scale > 1);
    reset.textContent = scale === 1 ? 'Fit' : `${Math.round(scale * 100)}%`;
    zoomIn.disabled = !ready || scale >= 4;
    zoomOut.disabled = !ready || scale <= 1;
    reset.disabled = !ready;
  }

  function fit() {
    if (!isOpen() || !ready) return;
    const ratio = Math.min(stage.clientWidth / image.naturalWidth, stage.clientHeight / image.naturalHeight, 1);
    width = image.naturalWidth * ratio;
    height = image.naturalHeight * ratio;
    image.style.width = `${width}px`;
    image.style.height = `${height}px`;
    scale = 1;
    x = y = 0;
    paint();
  }

  function zoom(next: number, anchorX = 0, anchorY = 0) {
    if (!ready) return;
    const value = Math.max(1, Math.min(4, next));
    x = anchorX - (anchorX - x) * value / scale;
    y = anchorY - (anchorY - y) * value / scale;
    scale = value;
    paint();
  }

  function update() {
    if (!isOpen()) return;
    pointers.clear();
    const slide = slides[current()];
    const trigger = slide.querySelector<HTMLButtonElement>('.teaser-expand')!;
    image.alt = slide.querySelector('img')!.alt;
    caption.textContent = slide.querySelector('.teaser-caption > span')?.textContent || image.alt;
    count.textContent = `${current() + 1} / ${slides.length}`;
    ready = false;
    image.style.visibility = 'hidden';
    status.textContent = 'Loading image…';
    scale = 1;
    x = y = 0;
    paint();
    image.src = trigger.dataset.fullSrc!;
  }

  image.addEventListener('load', () => {
    ready = true;
    status.textContent = '';
    fit();
    image.style.visibility = 'visible';
  }, { signal });
  image.addEventListener('error', () => {
    status.textContent = 'This image could not load. Return to the project or try another image.';
  }, { signal });

  function close(restoreFocus = true) {
    if (!isOpen()) return;
    pointers.clear();
    viewer.hidden = true;
    panel.hidden = false;
    dialog.classList.remove('is-expanded');
    dialog.scrollTop = scrollTop;
    if (restoreFocus) slides[current()].querySelector<HTMLButtonElement>('.teaser-expand')!.focus({ preventScroll: true });
  }

  slides.forEach(slide => slide.querySelector('.teaser-expand')!.addEventListener('click', () => {
    scrollTop = dialog.scrollTop;
    panel.hidden = true;
    viewer.hidden = false;
    dialog.classList.add('is-expanded');
    dialog.scrollTop = 0;
    update();
    back.focus();
  }, { signal }));
  back.addEventListener('click', () => close(), { signal });
  zoomIn.addEventListener('click', () => zoom(scale + 0.5), { signal });
  zoomOut.addEventListener('click', () => zoom(scale - 0.5), { signal });
  reset.addEventListener('click', fit, { signal });

  // Captured pointers support both mouse dragging and two-finger image zoom.
  stage.addEventListener('pointerdown', event => {
    if (!ready || (event.pointerType === 'mouse' && event.button !== 0)) return;
    stage.focus({ preventScroll: true });
    stage.setPointerCapture(event.pointerId);
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
  }, { signal });
  stage.addEventListener('pointermove', event => {
    const previous = pointers.get(event.pointerId);
    if (!previous) return;
    const before = [...pointers.values()];
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    const after = [...pointers.values()];
    if (before.length === 2) {
      const distance = (points: typeof before) => Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
      const oldDistance = distance(before);
      const bounds = stage.getBoundingClientRect();
      if (oldDistance > 0) zoom(scale * distance(after) / oldDistance,
        (before[0].x + before[1].x) / 2 - bounds.left - bounds.width / 2,
        (before[0].y + before[1].y) / 2 - bounds.top - bounds.height / 2);
      x += (after[0].x + after[1].x - before[0].x - before[1].x) / 2;
      y += (after[0].y + after[1].y - before[0].y - before[1].y) / 2;
    } else if (before.length === 1 && scale > 1) {
      x += event.clientX - previous.x;
      y += event.clientY - previous.y;
    }
    paint();
  }, { signal });
  for (const eventName of ['pointerup', 'pointercancel', 'lostpointercapture']) {
    stage.addEventListener(eventName, event => { pointers.delete((event as PointerEvent).pointerId); }, { signal });
  }

  function panWithKey(event: KeyboardEvent) {
    if (!isOpen() || scale <= 1 || event.target !== stage) return false;
    if (event.key === 'ArrowLeft') x += 60;
    else if (event.key === 'ArrowRight') x -= 60;
    else if (event.key === 'ArrowUp') y += 60;
    else if (event.key === 'ArrowDown') y -= 60;
    else return false;
    event.preventDefault();
    paint();
    return true;
  }
  stage.addEventListener('keydown', event => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') panWithKey(event);
  }, { signal });
  const observer = new ResizeObserver(fit);
  observer.observe(stage);
  signal.addEventListener('abort', () => observer.disconnect(), { once: true });
  return { update, close, isOpen, panWithKey };
}
