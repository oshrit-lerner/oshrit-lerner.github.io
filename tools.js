const counters 			= {k:16, a:27, o:16, g:11, t:19};
let current_type 		= 'k';
let current_presented 	= -1;

let current_first_type 	= 1;

function close_photo()
{
	$('.photo_presentation').css('visibility', 'hidden');
	$('#gallery_next').hide();
	$('#gallery_back').hide();
}
function get_next_link(type, id)
{
	$('#next_link').css('visibility', 'visible');

	if (counters[type]===id)
	{
		$('#next_link').css('visibility', 'hidden');
		return;
	}
	$('#next_link').attr('href', "javascript:show_next_image('"+type+"', "+(id+1)+")");
	$('#gallery_next').fadeIn(1500);
}

function get_back_link(type, id)
{
	$('#back_link').css('visibility', 'visible');

	if (id===1)
	{
		$('#back_link').css('visibility', 'hidden');
		return;
	}

	$('#back_link').attr('href', "javascript:show_next_image('"+type+"', "+(id-1)+")");
	$('#gallery_back').fadeIn(1500);
}

function show_next_image(type, id)
{
	$('#photos_gallery').css('visibility', 'hidden');
	show_image(type, id);
}

function show_image(type, id)
{
	current_presented = id;
	$('.photo_presentation').css('visibility', 'visible');
	$('#gallery_next').show();
	$('#gallery_back').show();

	const file_name = type+"/"+type+pad(id, 2)+'.jpg';

	const image = $("#photo_src");
	$('.gallery_nava').hide();
	$('#mask_gallery').show();
	const new_file = '../gallery/'+file_name;
	
	if(new_file === image.attr("src"))
		image.show();
	else
		image.attr("src", new_file);

	const img = new Image();
	img.src = new_file;
	img.onload = function() {
		$('#frame_gallery_src').hide().attr("src",  img.width > 600 ? "frame-gallery_big.gif" : "frame-gallery.gif").show();
		$('#mask_gallery').fadeOut(200);
	};
	get_next_link(type, id);
	get_back_link(type, id);
}

function print_menu()
{
	var menu = "<div class = 'menu_button'>"+
		"<a class ='link' href='./'>ראשי</a>"+
		"</div>"+
		"<div class = 'menu_button'>"+
		"<a class ='link' href='profile.html'>פרופיל</a>"+
		"</div>"+
		"<div class = 'menu_button'>"+
		"<a class ='link' href='gallery.html'>גלריות</a>"+
		"</div>"+
		"<div class = 'menu_button'>"+
		"<a class ='link' href='contact_me.html'>צור קשר</a>"+
	"</div>";
	$("#menu_buttons").html(menu);
}


function print_footer()
{
	const footer = "<div id='phone'><a href='tel://0506411478'>טל להזמנות: 0506411478</a></div>"+
				 "<div id='email'><a href='mailto:info@oshrit.com'>info@oshrit.com</a></div>"+
				 "<div id='facebook'><a  target='_blank' href='https://www.facebook.com/pages/%D7%90%D7%95%D7%A9%D7%A8%D7%99%D7%AA-%D7%9C%D7%A8%D7%A0%D7%A8-%D7%9E%D7%90%D7%A4%D7%A8%D7%AA/255545934483547'>חפשו אותי בפייסבוק<img src='facebook.gif'></a></div>";
	$("#footer").html(footer);
}

function print_gallery_menu()
{
	const gellery_menu =  "<div class = 'gallery_titles link selected'>"+
							"<a href='javascript:load_gallery(\"k\", 1);'>כלות</a>"+
						"</div>"+
						"<div class = 'gallery_titles link'>"+
							"<a href='javascript:load_gallery(\"a\", 1);'>ערב</a>"+
						"</div>"+
						"<div class = 'gallery_titles link'>"+
							"<a href='javascript:load_gallery(\"o\", 1);'>אופנה</a>"+
						"</div>"+
						"<div class = 'gallery_titles link'>"+
							"<a href='javascript:load_gallery(\"g\", 1);'>ציורי גוף ופנים</a>"+
						"</div>"+
						"<div class = 'gallery_titles link'>"+
							"<a href='javascript:load_gallery(\"t\", 1);'>קולנוע וטלוויזיה</a>"+
						"</div>";
	$("#gallery_menu_buttons").html(gellery_menu);
}

function load_gallery(type, from)
{
	$('.photo_presentation').css('visibility', 'hidden');

	current_type 	   = type;
	current_first_type = from;

	const num_of_images = Math.min(counters[type], from+5);
	let images2present = [];
	for (let img = from; img<= num_of_images; img++){
		images2present.push("<div class= 'pic obj_"+(+1+(img-1)%6)+"'><img src='../thumbnails/"+type+"/"+type+pad(img, 2)+".jpg'></div><a href ='javascript:show_image(\""+type+"\", "+img+");'\"><div class='pics mask obj_"+(+1+(img-1)%6)+"' ></div></a>");
	}
	$("#gallery_buttons").html(images2present.join(''));

	$('#gallery_nav_next').css('visibility', 'visible');
	$('#gallery_nav_back').css('visibility', 'visible');

	if(num_of_images===counters[type])
		$('#gallery_nav_next').css('visibility', 'hidden');
	if(from===1)
		$('#gallery_nav_back').css('visibility', 'hidden');

	$('.pics').mouseover( function(){
		$(this).css('cursor', 'pointer');
		$(this).animate({opacity:'0.6'}, 0);
		$(this).animate({opacity:'0'}, 800);
	});



}


function init_nav() {
	$('#gallery_nav_next').mouseover( function(){
		$('#gallery_nav_next').css('cursor', 'pointer');
		$('#next_img').attr('src','./nav/next2.gif');
	});
	$('#gallery_nav_next').mouseleave( function(){
		$('#next_img').attr('src','./nav/next.gif');
	});
	$('#gallery_nav_next').mouseup( function(){
		$('#next_img').attr('src','./nav/next2.gif');
	});
	$('#gallery_nav_next').mousedown( function(){
		$('#next_img').attr('src','./nav/next3.gif');
		load_gallery(current_type, current_first_type+6);
	});

	$('#gallery_nav_back').mouseover( function(){
		$('#gallery_nav_back').css('cursor', 'pointer');
		$('#back_img').attr('src','./nav/back2.gif');
	});
	$('#gallery_nav_back').mouseleave( function(){
		$('#back_img').attr('src','./nav/back.gif');
	});
	$('#gallery_nav_back').mouseup( function(){
		$('#back_img').attr('src','./nav/back2.gif');
	});
	$('#gallery_nav_back').mousedown( function(){
		$('#back_img').attr('src','./nav/back3.gif');
		load_gallery(current_type, current_first_type-6);
	});
}



function pad(n, width, z) {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

