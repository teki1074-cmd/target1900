/* 単語帳クイズ・ナットパズル共通の「アバターポイント」保存領域。
   同一オリジン(GitHub Pages)の全ページから同じlocalStorageキーを読み書きする。
   累計ポイント(total)のみを保持し、段階の判定は表示側(index.html)で行う。 */
(function(){
  const KEY = 'avatarGame_v1';

  function load(){
    let s = {};
    try{ s = JSON.parse(localStorage.getItem(KEY) || '{}'); }catch(e){}
    if(s.total === undefined){
      // 旧仕様(エサやり式: points+grown)からの移行
      s.total = (s.points||0) + (s.grown||0);
    }
    return { total: s.total||0 };
  }

  function save(state){
    try{ localStorage.setItem(KEY, JSON.stringify(state)); }catch(e){}
  }

  function add(amount){
    const n = Math.round(amount);
    if(!(n > 0)) return load();
    const s = load();
    s.total += n;
    save(s);
    return s;
  }

  window.AvatarPoints = { KEY, load, save, add };
})();
