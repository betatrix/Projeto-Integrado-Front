import {Link} from 'react-router-dom';

export const Dashboard = () =>{
    return(
        <div>
            <p>Dashboard</p>
            <Link to={"/cadastro"}>Cadastro de Instituição</Link>
            
        </div>
        
    )
}




// import { Title } from "./styles" // importando o titulo estilizado para o componente da página
// import { BackPageButton } from "../../components/Back Page Button/style" // importando componente de botão reutilizável

// // componente base dessa página
// function AdminDashboard() {
//     return (
//         <div>
//             <Title>Dashboard do Administrador</Title>
//             <BackPageButton>Voltar</BackPageButton>
//         </div>
//     )
// }

// export default AdminDashboard