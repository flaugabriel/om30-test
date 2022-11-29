import axios from 'axios';
import { useState, useEffect, Fragment } from 'react';
import { cpfMask } from '../../tools/cpfMask'
import { phoneNumber } from '../../tools/phoneNumber'

const User = ({urlApi}) => {
  const [users, setUsers] = useState({});

  function actionUpdateStatus(id) {
    return axios.put(urlApi + 'users/update_status/' + id).then((res) => res.data)
  }

  const setStatus = (id) => {
    actionUpdateStatus(id).then((resp) => {
      if (resp.messenger  !== undefined && resp.messenger !== '') {
        setUsers(...users)
      }else{
        alert('Algo deu errado durante atualização do status');
      }
    });
  }

  function getAPIData() {
   return axios.get(urlApi + 'users').then((res) => res.data);
  }

  useEffect(() => {
    let mounted = true;
    getAPIData().then((items) => {
      if (mounted) {
        setUsers(items)
      }
    });
    if (users && users.length > 0) {
      mounted = false
    }else {
      mounted = true
    }

    return () => (mounted);
  },);

  console.log(users);

  return (
    <Fragment>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h2>Lista de Pessoas</h2>
          <div className='row'>
            <div className="col-md-12">
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group me-2">
                  <div className="input-group input-group-lg">
                    <input type="text" className="form-control" placeholder="Pesquisa..." />
                    <span classNameName='mb-md-1'></span>
                  </div>
                  <input type="checkbox" className="btn-check" id="recent" name="recent" autocomplete="off"/>
                  <label className="btn btn-outline-primary" for="recent">Recente</label>
                  <input type="checkbox" className="btn-check" id="lasties" name="lasties" autocomplete="off"/>
                  <label className="btn btn-outline-primary" for="lasties">Ultimos</label>
                  <input type="checkbox" className="btn-check" id="status" name="status" autocomplete="off"/>
                  <label className="btn btn-outline-primary" for="status">Status</label>
                  <button className="btn btn-sm btn-success" type="button">Buscar</button>
                  <button className="btn btn-outline-white text-dark" type="button">Limpar</button>
                </div>
              </div>
            </div>
          </div>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">Foto</th>
              <th scope="col">Nome</th>
              <th scope="col">CPF</th>
              <th scope="col">CNS</th>
              <th scope="col">E-mail</th>
              <th scope="col">Data de aniversário</th>
              <th scope="col">Telefone</th>
              <th scope="col">Status</th>
              <th scope="col">Ação</th>
            </tr>
          </thead>
          <tbody>
            {users && users.length > 0 ? 
            users.map((item) => 
              <tr key={item.id}>
                <td>
                  {item.avatar_url !== '' ? 
                      <img src={item.avatar_url} class="rounded-circle"
                      height="60" alt="Avatar" loading="lazy" />
                      : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50"><path d="M10.97 8.265a1.45 1.45 0 00-.487.57.75.75 0 01-1.341-.67c.2-.402.513-.826.997-1.148C10.627 6.69 11.244 6.5 12 6.5c.658 0 1.369.195 1.934.619a2.45 2.45 0 011.004 2.006c0 1.033-.513 1.72-1.027 2.215-.19.183-.399.358-.579.508l-.147.123a4.329 4.329 0 00-.435.409v1.37a.75.75 0 11-1.5 0v-1.473c0-.237.067-.504.247-.736.22-.28.486-.517.718-.714l.183-.153.001-.001c.172-.143.324-.27.47-.412.368-.355.569-.676.569-1.136a.953.953 0 00-.404-.806C12.766 8.118 12.384 8 12 8c-.494 0-.814.121-1.03.265zM13 17a1 1 0 11-2 0 1 1 0 012 0z"></path><path fill-rule="evenodd" d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM2.5 12a9.5 9.5 0 1119 0 9.5 9.5 0 01-19 0z"></path></svg> }
                </td>
                <td>{item.name}</td>
                <td>{cpfMask(item.cpf)}</td>
                <td>{item.cns}</td>
                <td>{item.email}</td>
                <td>{item.birth_date}</td>
                <td>{phoneNumber(item.phone)}</td>
                <td>
                  {item.status === 'off' ? 
                    <span className="badge bg-danger">Inativo</span>
                  :
                    <span className="badge bg-success">Ativo</span>
                  }
                </td>
                <td>
                  <div className="btn-group dropstart">
                    <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                      Abrir
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href={`/users/${item.id}`}>Editar</a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/users/#" onClick={() => setStatus(item.id)}>
                        { item.status === 'on' ? 'Inativar ?' : 'Ativar ?'
                        }
                      </a></li>
                    </ul>
                  </div>
                </td>
              </tr>
            ) : <span>
                Não foi encontrado nenhuma pessoa
              </span>}
          </tbody>
        </table>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li className="page-item"><a className="page-link" href="#">1</a></li>
            <li className="page-item"><a className="page-link" href="#">2</a></li>
            <li className="page-item"><a className="page-link" href="#">3</a></li>
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </Fragment>
  );
}

export default User;