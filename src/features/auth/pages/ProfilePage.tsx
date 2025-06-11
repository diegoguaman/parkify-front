import { useAuthStore } from "../../../store/auth.store"


const ProfilePage = () => {
    const userName = useAuthStore((state) => state.user.username)
    const role = useAuthStore((state) => state.user.role)
  return (
    <div>
      perfil de usuario
      <h1>Nombre: {userName}</h1>
      <h4>Rol: {role}</h4>
    </div>
  )
}

export default ProfilePage
