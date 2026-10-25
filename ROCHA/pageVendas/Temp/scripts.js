/* ===========================================================
   scripts.js — COMPORTAMENTOS que o HTML sozinho não faz
   1) Mostra o aviso quando um botão sem link é clicado.
   2) Fecha o menu hambúrguer ao tocar em "Quero o Método ADC".
   =========================================================== */

document.querySelectorAll('[data-notice]').forEach(button=>{
  button.addEventListener('click',()=>{
    document.getElementById(button.dataset.notice).hidden=false;
  });
});
document.querySelector('.mobile-panel a[href="#oferta"]').addEventListener('click',()=>{
  document.querySelector('.mobile-menu').open=false;
});
