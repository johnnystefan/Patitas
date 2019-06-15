import React, { useState } from "react";
import { connect } from 'react-redux';
import {storage, database } from '../utils/firebase';

const Form = props => {
  // validacion visual del formulario
  const [ petPhoto, setPetPhoto] = useState('')
  const [ sendForm, setSendForm] = useState(false);

  // funcion que se encargara de enviar nuestra foto a la
  // base de dato
  const handleSubmit = event => {
    event.preventDefault();
    const form = new FormData(event.target);
    const newDate = new Date().toISOString();
    const data = {
      'name': form.get('name'),
      'description': form.get('description'),
      'type': form.get('type'),
      'gender': form.get('gender'),
      'adopt': form.get('adopt'),
      'date': newDate,
      'photo': petPhoto,
      'profilePic': props.user.photoURL,
      'userContact': props.user.email,
      'username': props.user.displayName
    };
    database.ref('pets').push(data)
      .then(() => setSendForm(true))
      .catch(() => setSendForm(false))
  };
  const onChange = event => {
    const file = event.target.files[0];
    const storageRef = storage.ref();
    const name = (+new Date()) + '-' + file.name;
    const uploadFile = storageRef.child(name).put(file);
    uploadFile
      .then((snapshot) => {
        snapshot.ref.getDownloadURL()
          .then(donwloadURL => {
            console.log(donwloadURL);
            setPetPhoto(donwloadURL);
          });
      });
  };
  return (
    <div className="Form">
      <div className="Form-head">
        <h2>Dar en Adopcion</h2>
      </div>
      {sendForm &&
        <div className="Form-send">
          <span>¡...Guardado Con Exito...!</span>
        </div>
      }
      {!sendForm &&
        <div className="Form-item">
          <form onSubmit={handleSubmit}>
            <input name="name" type="text" placeholder="Nombre de tu mascota" required />
            <input name="description" type="text" placeholder="Describe tu mascota" required />
            <select name="type" required>
              <option disabled selected>Selecionar</option>
              <option value="cat">Gato</option>
              <option value="dog">Perro</option>
            </select>
            <select name="gender" required>
              <option disabled selected>Selecionar</option>
              <option value="female">femenino</option>
              <option value="male">Masculino</option>
            </select>
            <select name="adopt" required>
              <option disabled selected>Selecionar</option>
              <option value="true">Dar en adopcion</option>
              <option value="false">Cuidar</option>
            </select>
            <input type="file" onChange={onChange} name="photo" required/>
            <button id="enviar" type="submit">Enviar</button>
          </form>
        </div>
      }
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Form);