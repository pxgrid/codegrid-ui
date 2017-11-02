window.addEventListener('DOMContentLoaded', function () {
  'use strict'

  //-
  //- ドロップダウンボックスのプレースホルダのスタイル
  //-
  function setupSelectPlaceholder() {
    // プレースホルダのクラス名
    var CLASSNAME_PLACEHOLDER_SELECTED = 'CG2-form__placeholder_selected'

    // フォーム内の<select>を抽出
    // セレクタ固定にもやっとするが、いまのとこかなり特定のやつ（フォーム）に依存しているので…
    var selectList = document.querySelectorAll('.CG2-form__table select')
    if (selectList.length === 0) { return }

    // プレースホルダを持った<select>のみ抽出
    // <select>のプレースホルダは、最初の<option>のうちvalueが空なもの
    // ref. https://html.spec.whatwg.org/multipage/forms.html#placeholder-label-option
    selectList = Array.prototype.filter.call(selectList, function (select) {
      return select.querySelector('option[value=""]:first-child') !== null
    })
    if (selectList.length === 0) { return }

    // 初期表示とイベントハンドリング
    selectList.forEach(function (select) {
      select.addEventListener('change', function (event) {
        updateView(select)
      })
      updateView(select)
    })

    // <option>を拾ってプレースホルダか否かでスタイルを切り替える
    function updateView(select) {
      var placeholderElement = select.querySelector('option[value=""]:first-child')

      if (placeholderElement.selected) {
        select.classList.add(CLASSNAME_PLACEHOLDER_SELECTED)
      }
      else {
        select.classList.remove(CLASSNAME_PLACEHOLDER_SELECTED)
      }
    }
  }

  setupSelectPlaceholder()

})
