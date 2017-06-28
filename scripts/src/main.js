AOS.init({
  duration: 1200
});

function scrollTo(div_id){
	var scroll = $(div_id).offset().top;
	var scroll = scroll - 62;
	$('html,body').animate({
		scrollTop: scroll
	},"slow");	
    return false;
}

function addMenuAtivo(menu){
	$(".menu-item").removeClass('active');
	$(menu).addClass('active');
}

function progressBar(){
	var progress = $(".habilidades__progress-bar-value");
	progress.each(function() {		
		var value = $(this).attr('data-value');
		$(this).css('width', value+'%');
	});
}

$(function() {
	$('body').animate({scrollTop:0}, 200);

	$(".menu li a").click(function(event) {
		event.preventDefault();
		scrollTo($(this).attr('href'));		
	});

	$("#menuMobile").click(function() {
		if($(this).hasClass("fechar")){
			$(this).removeClass('fechar');
			$(".container-menu").removeClass('mostrar');
		
		}else{
			$(this).addClass('fechar');
			$(".container-menu").addClass('mostrar');
		}
	});
	
	$(".menu-item").click(function() {
		$(".container-menu").removeClass('mostrar');
		$("#menuMobile").removeClass('fechar');
	});

	$.fn.selecionaMenu = function() {
		var $element =  this;
		$(window).scroll(function() {
			var height = 62;
			var $window = $(this);

			var id = $element[0].id.toLowerCase();
			id = id.replace("menu", "");

			var offset = $("#"+id).offset().top - height;
			if ($window.scrollTop() >= offset) {
				addMenuAtivo($element);

				if(id=="habilidades"){
					progressBar();

					$('.chart').easyPieChart({
						easing 		: 'easeOutBounce',
						barColor	: '#2e93b3',
						trackColor	: '#e1e1e3',
						scaleColor	: '#e1e1e3',
						scaleLength	: 0,
						lineCap		: 'round',
						lineWidth	: 15,
						size 		: 152,
						rotate 		: 0,
						animate 	: 800,
						onStep: function(from, to, percent) {
							$(this.el).find('.percent').text(Math.round(percent));
						}
					});
				}
			}
		});
	}

	$("#menu li").each(function() {
		var href = $(this).attr('id');
		$("#"+href).selecionaMenu();
	});
});