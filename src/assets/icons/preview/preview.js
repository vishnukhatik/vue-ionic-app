$(document).ready(() => {
  const $page = $('.js-page');
  const $grid = $('.js-grid');
  const $icons = $('.js-icon');
  const $searchInput = $('.js-search-input');
  const $sectionTabs = $('.js-section-tabs');
  const $sizeTabs = $('.js-size-tabs');
  const $togglePreviewChars = $('.js-toggle-preview-chars');
  const $toggleEditor = $('.js-toggle-editor');
  const $popupWrapper = $('.js-popup-wrapper');
  const $popup = $('.js-popup');
  const $dimmer = $('.js-dimmer');
  const $popupClose = $('.js-popup-close');
  const $fontSizeInput = $('.js-font-size-input');
  const $editor = $('.js-editor');
  const $fontFamilySelector = $('.js-font-family-selector');
  const $textarea = $('.js-textarea');
  const $cheatcodeInputs = $('.js-cheatcode');

  $('.js-tabs').each(function () { initTabs(this); });
  $searchInput.on('keyup', onSearch);
  $sizeTabs.on('tabClick', onSizeTabClick);
  $sectionTabs.on('tabClick', onSectionTabClick);
  $togglePreviewChars.on('click', onTogglePreviewCharsClick);
  $toggleEditor.on('click', onToggleEditorClick);
  $grid.on('click', '.js-icon', onIconClick);
  $popupClose.on('click', onPopupClose);
  $dimmer.on('click', onPopupClose);
  $page.on('click', '.js-usage-example-link', onUsageExampleClick);
  $fontSizeInput.on('change', onFontSizeChanged);
  $fontFamilySelector.on('change', onFontFamilyChanged);
  $cheatcodeInputs
    .on('mouseup', onCheatcodeFocus)
    .on('click', onCheatcodeFocus)
    .on('focus', onCheatcodeFocus);

  function onSearch(e) {
    const term = e.target.value.trim();

    if (!term.length) {
      $icons.show();
      return;
    }

    const nameRegex = new RegExp(term, 'i');

    $icons
      .hide()
      .filter(function () { return nameRegex.test(this.getAttribute('data-name')); })
      .filter(function () { return nameRegex.test(this.getAttribute('data-name')); })
      .show();
  }

  function initTabs(el) {
    const $tabs = $(el);
    let $tab;
    $tabs.on('click', (e) => {
      if (e.target.parentElement !== el || $tabs.hasClass('m-inactive')) return;
      $tab = $(e.target);
      $tab.addClass('m-active').siblings('.m-active').removeClass('m-active');
      $tabs.trigger('tabClick', $tab.data('value'));
    });
  }

  function onSizeTabClick(e, size) {
    $grid.attr('data-size', size);
  }

  function onSectionTabClick(e, mode) {
    $sizeTabs.toggleClass('m-inactive', mode !== 'grid');
    $grid.attr('data-mode', mode);
    $togglePreviewChars.parent().toggleClass('m-inactive', mode == 'cheatsheet');
  }

  function onTogglePreviewCharsClick() {
    if ($(this).parent().hasClass('m-inactive')) { return; }
    $togglePreviewChars.toggleClass('m-active');
    $page.toggleClass('m-preview-characters');
  }

  function onToggleEditorClick() {
    $toggleEditor.toggleClass('m-active');
    $editor.toggleClass('m-active');
  }

  function onIconClick(e) {
    const $icon = $(e.currentTarget);
    const gridMode = $icon.parents('.js-grid').data('mode');
    if (gridMode == 'grid') { openPopup($icon[0].outerHTML); }
  }

  function openPopup(html) {
    $popupWrapper.addClass('m-active');
    setTimeout(() => { $popup.html(html); });
  }

  function onPopupClose() {
    $popupWrapper.removeClass('m-active');
    $popup.html('');
  }

  function onUsageExampleClick(e) {
    const example = $(e.currentTarget).data('example');
    openPopup($(`.js-usage-example[data-example="${example}"]`).html());
  }

  function onFontSizeChanged(e) {
    let val = e.target.value.trim();
    if (val.indexOf('px') == -1 && val.indexOf('em') == -1 && val.indexOf('%') == -1 && val.indexOf('rem') == -1) { val += 'px'; }
    $textarea.css('font-size', val);
  }

  function onFontFamilyChanged(e) {
    const val = e.target.value.trim();
    $textarea.css('font-family', `Standard-myposeo, ${val}`);
  }

  function onCheatcodeFocus(e) {
    e.preventDefault();
    const t = $(this);
    setTimeout(() => {
      t.select();
    }, 150);
  }
});
