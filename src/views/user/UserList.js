import { useEffect, useState } from "react";
import { URL_API } from "../../Const";


function Pagination({pages, changeActivePage, changePerPage, activePage}){
    const itens = [];
    
    for(let i=0;i<pages;i++){
        itens.push(    
            <li class="page-item" className={'page-item' + (activePage === i+1 ? 'active' : '')} key={i}>
                <button class="page-link" onClick={() => changeActivePage(i+1)}>{i+1}</button>
            </li>   
        )
    }

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center" >
                {itens}
            </ul>
            <li>
                <select onChange={changePerPage}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                </select>
            </li>
        </nav>
    )

}

function UserList(){

    const [activePage, setActivePage] = useState(1); //Pagina Ativa
    const [perPage, setPerPage] = useState(5); //Elementos por paginas
    const [data, setData] = useState([] | {}); //Dados de usuários

    useEffect(() => {
        fetch(`${URL_API}users?page=${activePage}&per_page=${perPage}`)
        .then(response => response.json())
        .then(res => {
            //Mudar o estado do componente;
            setData(res);
        })
        .catch(e => console.log(e));
    }, [activePage, perPage]);

    function handleChangeActivePage(page = 1){
       setActivePage(page);
    }

    function handleChangePerPage(event){

    }

    return(
        <>
        <h3>Usuários</h3>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th></th>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {data?.data?.map(pes => (    
                    <tr key={pes.id}>
                        <td><img src={pes.avatar} alt={pes.first_name}></img></td>
                        <td>{pes.first_name} {pes.last_name}</td>
                        <td>{pes.email}</td>
                        <td><button className="btn btn-warning" valeu={pes.id}>Edit</button>
                            <button className="btn btn-danger ms-1">Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <Pagination 
            pages={data.total_pages} 
            activePage={activePage}
            changeActivePage={handleChangeActivePage} 
            changePerPage={handleChangePerPage}></Pagination>
        </>
    );
}

export default UserList;