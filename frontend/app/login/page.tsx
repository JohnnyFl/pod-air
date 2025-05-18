import Login from '../components/auth/Login'

export default function LoginPage() {
    return (
        <div className="relative h-screen">
            {/* Background Image */}
            <div
                className="absolute inset-0 -top-16 bg-cover bg-center blur-lg"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1484755560615-a4c64e778a6c?q=80&w=3189&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                }}
            ></div>

            {/* Overlay to dim the background (optional) */}
            <div className="absolute inset-0 -top-16 bg-black/40"></div>

            {/* Centered SignIn Form */}
            <div className="relative z-10 flex items-center justify-center h-full max-w-md mx-auto">
                <Login />
            </div>
        </div>
    )
}
