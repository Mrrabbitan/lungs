const config = {
	name: '北京市',
	name1: '北京',
	name2: '石景山'
}

function dateFormat(fmt, date) {
	let ret;
	const opt = {
		"Y+": date.getFullYear().toString(), // 年
		"m+": (date.getMonth() + 1).toString(), // 月
		"d+": date.getDate().toString(), // 日
		"H+": date.getHours().toString(), // 时
		"M+": date.getMinutes().toString(), // 分
		"S+": date.getSeconds().toString() // 秒
		// 有其他格式化字符需求可以继续添加，必须转化成字符串
	};
	for (let k in opt) {
		ret = new RegExp("(" + k + ")").exec(fmt);
		if (ret) {
			fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
		};
	};
	return fmt;
}
$.ajax({
	url: 'https://jk.avuejs.com/news?name=' + config.name,
	dataType: 'json',
	success: (data) => {
		let str = '';
		data.forEach(ele => {
			str = str +
				`
							<div style="margin-top:20px;background-color:#fff;padding:10px 30px;border-radius:10px;overflow:hideen;">
								<a href="${ele.sourceUrl}" style="color:#333;text-decoration:none;">
									<span style="font-size:24px;">${dateFormat("YYYY-mm-dd HH:MM",new Date(ele.pubDate))}</span>
									<h3 style="font-size:40px;margin:20px 0 20px 0;">${ele.title}</h3>
									<p style="color: #999;font-size:28px;line-height:40px;">${ele.summary}</p>
									<p style="text-align:right;font-size:24px;">信息来源:${ele.infoSource}</p>
								</a>
							</div>
						`
		})
		$('#dt').html(str);
	}
})

function getAreaList(data) {
	data.forEach(ele => {
		if (ele.area === config.name1) {
			let str = '';
			ele.children.forEach(item => {
				console.log(item)
				if (item.city === config.name2) {
					$('#count11').html(item.today.confirm);
					$('#count21').html(item.confirm);
					$('#count31').html(item.heal);
					$('#count41').html(item.dead);
				}
				str = str +
					`
							<div class="infoItem">
								<span class="name">${item.city}</span>
								新<span class="confirm">${item.today.confirm}</span>例<span class="hide">，
								确<span class="confirm">${item.confirm}</span>例<span class="hide">，
								治<span>${item.heal}</span>例</span><span class="hide">，
								死<span>${item.dead}</span>例</span>
							</div>`

			})
			$('#list').html(str)
		}

	})

}
$('#wechatbox').hide();
$('#wechat').click(() => {
	$('#wechatbox').show();
})
$('#wechatbox').click(() => {
	$('#wechatbox').hide();
})

setTimeout(() => {
	var swiper = new Swiper('.swiper-container', {
		loop: true,
		slidesOffsetBefore: 64,
		width: 622,
		spaceBetween: 20,
		autoplay: false,
		speed: 100,
		pagination: {
			el: '.swiper-pagination',
			bulletClass: 'my-bullet',
			bulletActiveClass: 'my-bullet-active',
			clickable: true,
		},
	})
}, 500)