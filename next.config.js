/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        //Vệ sinh các đối tượng
        swcPlugins: [
            ["next-superjson-plugin", {}]
        ]
    },
    //Thêm tên miền hình ảnh khi đăng nhập bằng các tài khoản khác
    images: {
        domains: [
            "res.cloundinary.com",
            "avatars.githubusercontent.com",
            "lh3.googleusercontent.com"
        ]
    }
}

module.exports = nextConfig
