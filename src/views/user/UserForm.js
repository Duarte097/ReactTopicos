import axios from "axios";
import { URL_API } from "../../Const";
import { useEffect, useReducer, useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";

class HTMLForm{
    constructor(first_name = '', last_name = '', email = ''){
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
    }
}

function UserForm(){

    const nav = useNavigate();
    
    //Estado para gerenciar o submissão do formulário da API
    const [submitting, setSubmitting] = useState(false);

    //Função redutora --> estado do formulário
    const formReducer = (state, event) => {
        if(event.reset){
            return new HTMLForm();
        }

        return {
            ...state,
            [event.name]: event.value
        }
    }

    //Reducer (estado complexo) para gerenciar dados do formulario
    const [formData, setFormData] = useReducer(formReducer, new HTMLForm());


    function handleSave(event){

        setSubmitting(true);

        axios.post(`${URL_API}users`, formData,
        {headers: {"Content-type": "application/json", Authorization: "token JWT gerado no login"}})
        .then(res =>{console.log("Sucesso: ", res);
            alert("Usuario salvo com ID:" + res.data.id);
            setFormData({reset: true});
        }).catch(err => {
            console.log(err);
            alert("Falha ao salvar");
        }).finally(() => setSubmitting(false));

        setSubmitting(false);

    }

    function handleChange(event){
        const isCheckbox = event.target.type === "checkbox";
        setFormData({
            name: event.target.name,
            value: isCheckbox? event.target.checked : event.target.value
        });
    }


    return(
        <>
         <h2>Usuario</h2>

         <form>
            <fieldset className="form-group" disabled={submitting}>
                <label className="form-label"> Primeiro Nome</label>
                <input type="text" name="fisrt_name" className="form-control" placeholder="Fulano" value={formData.first_name} onChange={handleChange}/>
            </fieldset>

            <fieldset className="form-group" disabled={submitting}>
                <label className="form-label"> Sobrenome</label>
                <input type="text" name="last_name" className="form-control" placeholder="de tal" value={formData.last_name} onChange={handleChange}/>
            </fieldset>

            <fieldset className="form-group" disabled={submitting}>
                <label className="form-label"> Email </label>
                <input type="text" name="email" className="form-control" placeholder="fulano@x.com" value={formData.email} onChange={handleChange}/>
            </fieldset>

            <div className="mt-4">
                <button  type="button" disabled={submitting} className="btn btn-success ms-1" onClick={handleSave}>Salvar</button>
                <button  type="button" disabled={submitting} className="btn btn-secondary ms-1" onClick={() => nav('/user')}>Cancelar</button>
            </div>
         </form>
        </>
    );
}

export default UserForm;