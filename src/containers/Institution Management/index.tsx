import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, Modal,
  IconButton, TextField, InputAdornment } from '@mui/material';
// import admin from '../../assets/icon-admin.png';
// import { SearchOutlined } from '@mui/icons-material';

interface Endereco {
    rua: string;
    numero: number;
    cidade: string;
    estado: string;
    cep: string;
}

interface Institution {
    id: number;
    nome: string;
    ativo: boolean;
    sigla: string;
    notaMEC: string;
    site: string;
    endereco: Endereco;
}

const ListInstitutions: React.FC = () => {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);

  const handleOpen = (institution: Institution) => {
    setSelectedInstitution(institution);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedInstitution(null);
  };

  // Buscar dados da sua API (substitua pela sua lógica real)
  useEffect(() => {
    const searchInstitution = async () => {
      const response = await fetch('http://localhost:8080/instituicao');
      const data = await response.json();
      setInstitutions(data);
    };
    searchInstitution();
  }, []);

  return (
    <Box sx={{ padding: 20 }}>

        {/* ---- futuro header ----  */}
        {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography>
                VOCCO
            </Typography>
            <img src={admin} alt="Vocco Logo" />
            <Typography variant="h5">
            Gerenciamento de Instituições
            </Typography>
        </Box> */}

        <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Gerenciamento de Instituições
        </Typography>

        <Table>

            <TableHead>

            <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Ativo</TableCell>
                <TableCell align="right">Ações</TableCell>
            </TableRow>

            </TableHead>

            <TableBody>
            {institutions.map((institution) => (
                <TableRow key={institution.id}>
                <TableCell>{institution.nome}</TableCell>
                <TableCell>{institution.ativo}</TableCell>
                <TableCell align="right">
                    <Button variant="outlined" onClick={() => handleOpen(institution)}>
                    Detalhes
                    </Button>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>

        {/* Modal para exibir detalhes do médico */}
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 3 }}>

            <Typography id="modal-title" variant="h6" component="h2">
                Detalhes da Instituição
            </Typography>

            <TextField
                label="ID:"
                value={selectedInstitution?.id || ''}
                InputProps={{
                readOnly: true,
                endAdornment: (
                    <InputAdornment position="end">
                    <IconButton aria-label="alternar visibilidade da senha">
                        {/* ... */}
                    </IconButton>
                    </InputAdornment>
                ),
                }}
            />

            <TextField
                label="Nome"
                value={selectedInstitution?.nome || ''}
                // readOnly
            />

            <TextField
                label="Sigla"
                value={selectedInstitution?.sigla || ''}
                // readOnly
            />

            <TextField
                label="Nota do MEC"
                value={selectedInstitution?.notaMEC || ''}
                // readOnly
            />

            <TextField
                label="Site"
                value={selectedInstitution?.site || ''}
                // readOnly
            />

            {/* Address Details */}
            <TextField
            label="Rua"
            value={selectedInstitution?.endereco?.rua || ''}
            // readOnly
            />

            <TextField
            label="Número"
            value={selectedInstitution?.endereco?.numero || ''}
            // readOnly
            />

            <TextField
            label="Cidade"
            value={selectedInstitution?.endereco?.cidade || ''}
            // readOnly
            />

            <TextField
            label="Estado"
            value={selectedInstitution?.endereco?.estado || ''}
            // readOnly
            />

            <TextField
            label="CEP"
            value={selectedInstitution?.endereco?.cep || ''}
            // readOnly
            />

            </Box>
        </Modal>
    </Box>
  );
};

export default ListInstitutions;


// import { BackPageButton } from "../../components/Back Page Button/style" // importando componente de botão reutilizável

// // componente base dessa página
// function InstitutionManagement() {
//     return (

//         <body>

//             <header>

//                 <div id="logo">
//                     <h1>Vocco</h1>
//                 </div>

//                 <div id="cabecalho">
//                     <ul>
                                    
//                         <p>Bem vindo de volta, Administrador!</p>
//                         <img src="../../assets/icon-admin.png" ></img>
                        
//                     </ul>
//                 </div>

//             </header>

//             <a>
//             <BackPageButton>Voltar</BackPageButton>
//             </a>

//             <div>
                

                
//             </div>

//         </body>

        
//     )
// }

// export default InstitutionManagement
