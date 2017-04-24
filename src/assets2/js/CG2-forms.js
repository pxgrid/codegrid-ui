window.addEventListener('DOMContentLoaded', function () {
  'use strict'

  //-
  //- ドロップダウンボックスのプレースホルダのスタイル
  //-
  function setupSelectPlaceholder() {
    // プレースホルダのクラス名
    var CLASSNAME_SELECT_PLACEHOLDER = 'CG2-form__placeholder_selected'

    var selects = document.querySelectorAll('.CG2-form__table select')
    if (selects.length === 0) { return }

    // プレースホルダを持った<select>のみ抽出
    // <select>のプレースホルダは、最初の<option>のうちvalueが空なもの
    // ref. https://html.spec.whatwg.org/multipage/forms.html#placeholder-label-option
    var selectsWithPlaceholder = Array.prototype.filter.call(selects, function (select) {
      return select.querySelector('option[value=""]:first-child') !== null
    })
    if (selectsWithPlaceholder.length === 0) { return }

    // 初期表示とイベントハンドリング
    selectsWithPlaceholder.forEach(function (select) {
      select.addEventListener('change', function (event) {
        renderPlaceholder(select)
      })
      renderPlaceholder(select)
    })

    // <option>を拾ってプレースホルダか否かでスタイルを切り替える
    function renderPlaceholder(select) {
      var optionPlaceholder = select.querySelector('option[value=""]:first-child')

      if (optionPlaceholder.selected) {
        select.classList.add(CLASSNAME_SELECT_PLACEHOLDER)
      }
      else {
        select.classList.remove(CLASSNAME_SELECT_PLACEHOLDER)
      }
    }
  }

  setupSelectPlaceholder()

})
