var $run = $('h1, h3, .options, a');

$('li[contenteditable]').click(function(e) {
  if($(this).html() == 'عدد وارد کنید') $(this).html(' ');
});

$('li[contenteditable]').on('keydown', function(e) {
  if(e.keyCode !== 8 && isNaN(+e.key)) return e.preventDefault();
});
$('li[contenteditable]').on('keyup', function(e) {
  $(this).data('val', /\d*/.exec($(this).html()));
});

$('a[href="#"]').click(function(e) {
  e.preventDefault();
  var $this = $(this);

  $this.addClass('running');
  var url = '/' + $('.options div:first-child li.active').data('val') + '/' + $('.options div:nth-child(2) li.active').data('val') + '/' + ($('.options div:last-child li.active').data('val') || 1);

  $.ajax({
    url: url,
    success: success
  });
});

$('li').click(function() {
  $(this).parent().find('li').removeClass('active');
  $(this).addClass('active');
});

function success(ipsum) {
  $('a').removeClass('running');
  $('.modal').html(ipsum);

  var range = document.createRange();
  range.selectNodeContents($('.modal')[0]);
  var selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
}
