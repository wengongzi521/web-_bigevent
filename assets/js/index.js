$(function() {
    // 调用getUserInfo获取用户基本信息
    getUserInfo()

    $('#btnLogout').on('click', function() {
        // 提示用户是否确认退出
        let layer = layui.layer
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //  清空本地存储中的token
            localStorage.removeItem('token')
                // 重新跳转到登录页面
            location.href = '/login.html'
                // 关闭confirm询问框
            layer.close(index);
        });
    })
})


// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败!')
            }
            // 调用renderAvatar渲染用户的头像
            renderAvatar(res.data)
        },
        // 登录拦截，无论成功或者失败，都会调用complete回调函数
        // complete: function(res) {
        //     // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 强制清空token
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }
    })
}

// 渲染用户头像
function renderAvatar(user) {
    // 获取用户的名称
    let name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        // 渲染用户的头像
    if (user.user_pic !== null) {
        // 渲染用户头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide()
            // 文本头像为英文大写或者中文第一个字
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()

    }
}