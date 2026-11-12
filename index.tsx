  const SYM: Record<string, string> = {'/':'÷','*':'×','-':'−','+':'+'};
  const $res = document.getElementById('result') as HTMLElement;
const $expr = document.getElementById('expr') as HTMLElement;
const $hist = document.getElementById('history') as HTMLElement;
  let cur = '0';
let prev: number | null = null;
let op: string | null = null;
let fresh = false;

  const fmt = (n: string | number): string => {
    if (typeof n === 'string') {
      const [i, d] = n.split('.');
      const neg = i.startsWith('-');
      const int = Number(i.replace('-','')).toLocaleString('pt-BR');
      return (neg ? '-' : '') + int + (d !== undefined ? ',' + d : '');
    }
    if (!isFinite(n)) return 'Erro';
    return Number(n.toPrecision(12)).toLocaleString('pt-BR', {maximumFractionDigits: 10});
  };
  const calc = (a: number, b: number, o: string): number => o==='+'?a+b : o==='-'?a-b : o==='*'?a*b : b===0?NaN : a/b;
  const render = () => {
    $res.textContent = fmt(cur);
    $expr.textContent = prev !== null && op ? `${fmt(prev)} ${SYM[op]}` : '';
    $res.style.fontSize = $res.textContent.length > 12 ? '2rem' : $res.textContent.length > 9 ? '2.4rem' : '3rem';
  };
  const addHistory = (text: string, value: string) => {
    const d = document.createElement('div');
    d.textContent = text; d.title = 'Usar este resultado';
    d.onclick = () => { cur = String(value); fresh = true; render(); };
    $hist.prepend(d);
  };

  const num = (d: string) => {
    if (cur === 'NaN' || fresh) { cur = '0'; fresh = false; }
    if (cur.replace(/[-.]/g,'').length >= 15) return;
    cur = cur === '0' ? d : cur === '-0' ? '-' + d : cur + d;
  };
  const setOp = (o: string) => {
    if (op && !fresh && prev !== null) {
      const r = calc(prev, parseFloat(cur), op!);
      cur = String(Number(r.toPrecision(12)));
    }
    prev = parseFloat(cur); op = o; fresh = true;
  };
  const actions: Record<string, () => void> = {
    clear(){ cur='0'; prev=null; op=null; fresh=false; },
    back(){ if (fresh) return; cur = cur.length>1 && cur!=='-0' ? cur.slice(0,-1) : '0'; if (cur==='-') cur='0'; },
    percent(){ const v = parseFloat(cur); cur = String(prev!==null && (op==='+'||op==='-') ? prev*v/100 : v/100); },
    sign(){ cur = cur.startsWith('-') ? cur.slice(1) : '-' + cur; },
    dot(){ if (fresh) { cur='0'; fresh=false; } if (!cur.includes('.')) cur += '.'; },
    equals(){
      if (op === null || prev === null) return;
      const b = parseFloat(cur), r = calc(prev, b, op);
      const text = `${fmt(prev)} ${SYM[op]} ${fmt(b)} = ${fmt(r)}`;
      cur = isFinite(r) ? String(Number(r.toPrecision(12))) : 'NaN';
      if (isFinite(r)) addHistory(text, cur);
      prev = null; op = null; fresh = true;
    }
  };

  document.querySelector('.keys')!.addEventListener('click', e => {
    const b = (e.target as HTMLElement).closest('button'); if (!b) return;
    if (b.dataset.num) num(b.dataset.num);
    else if (b.dataset.op) setOp(b.dataset.op);
    else actions[b.dataset.action!]();
    render();
  });
  document.addEventListener('keydown', e => {
    const k = e.key;
    if (/^[0-9]$/.test(k)) num(k);
    else if ('+-*/'.includes(k)) setOp(k);
    else if (k === 'Enter' || k === '=') { e.preventDefault(); actions.equals(); }
    else if (k === ',' || k === '.') actions.dot();
    else if (k === 'Backspace') actions.back();
    else if (k === 'Escape') actions.clear();
    else if (k === '%') actions.percent();
    else return;
    render();
  });
  render();

  if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => {});
