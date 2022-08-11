// 注意：每次调用$.get或$.post或$.ajax的时候，会先调用ajaxPrefilter函数
// 在这个函数中，可以拿到我们给ajax提供配置的对象
$.ajaxPrefilter(function(options) {

    // 在发起真正的Ajax请求之前，统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    console.log(options.url);
})