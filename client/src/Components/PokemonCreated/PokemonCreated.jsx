// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { postPokemon, getTypes } from "../../Redux/Action/index";
// import pokemonLogo from "../../assets/testeando.png";
// import professorOak from "../../assets/testeando.png";

// function validate(input) {
//   let errors = {};
//   let nameRequire = /^[a-zA-Z]+$/;
//   let numbers = /^[0-9]*[1-9][0-9]*$/;
//   let validateUrl = /\.(gif|jpeg|jpg|png)$/i;

//   if (!input.name) {
//     errors.name = "Name is required";
//   } else if (input.name.length < 3 || input.name.length > 16) {
//     errors.name = "Name must be between 3-16 letters";
//   } else if (!nameRequire.test(input.name)) {
//     errors.name = "Name must contain only letters";
//   }
//   if (!input.hp || input.hp === 0) {
//     errors.hp = "Health is required";
//   } else if (!numbers.test(input.hp)) {
//     errors.hp = "Health must be a positive integer";
//   }
//   if (!input.str || input.str === 0) {
//     errors.str = "Strength is required";
//   } else if (!numbers.test(input.str)) {
//     errors.str = "Strength must be a positive integer";
//   }
//   if (!input.def || input.def === 0) {
//     errors.def = "Defense is required";
//   } else if (!numbers.test(input.def)) {
//     errors.def = "Defense must be a positive integer";
//   }
//   if (!input.spd || input.spd === 0) {
//     errors.spd = "Speed is required";
//   } else if (!numbers.test(input.spd)) {
//     errors.spd = "Speed must be a positive integer";
//   }
//   if (!input.height || input.height === 0) {
//     errors.height = "Height is required";
//   } else if (!numbers.test(input.height)) {
//     errors.height = "Height must be a positive integer";
//   }
//   if (!input.weight || input.weight === 0) {
//     errors.weight = "Weight is required";
//   } else if (!numbers.test(input.weight)) {
//     errors.weight = "Weight must be a positive integer";
//   }
//   if (!input.image) {
//     errors.image = "Image is required";
//   } else if (!validateUrl.test(input.image)) {
//     errors.image = "Image must be a validate URL";
//   }
//   if (input.types.length === 0) {
//     errors.types = "Type is required";
//   } else if (input.types.length > 2) {
//     errors.types = "A pokemon can only contain 1 or 2 types";
//   }

//   return errors;
// }

// export default function PokemonCreate() {
//   const dispatch = useDispatch();
//   // eslint-disable-next-line
//   const navigate = useNavigate();
//   const allTypes = useSelector((state) => state.types);
//   const [errors, setErrors] = useState({});
//   const [input, setInput] = useState({
//     name: "",
//     hp: 0,
//     str: 0,
//     def: 0,
//     spd: 0,
//     height: 0,
//     weight: 0,
//     image: "",
//     types: [],
//   });
//   const isEnabled = Object.keys(errors).length === 0 && input.name !== "";

//   function handleChange(e) {
//     setInput({
//       ...input,
//       [e.target.name]: e.target.value,
//     });
//     setErrors(
//       validate({
//         ...input,
//         [e.target.name]: e.target.value,
//       })
//     );
//   }

//   function handleCheckBoxOnChange(e) {
//     let clickedType = allTypes
//       .filter((el) => e.target.value === el.name)
//       .map((el) => el.id);
//     if (e.target.checked) {
//       setInput({
//         ...input,
//         types: [...input.types, ...clickedType],
//       });
//       setErrors(
//         validate({
//           ...input,
//           types: [...input.types, ...clickedType],
//         })
//       );
//     } else {
//       setInput({
//         ...input,
//         types: input.types.filter((e) => e !== clickedType[0]),
//       });
//       setErrors(
//         validate({
//           ...input,
//           types: input.types.filter((e) => e !== clickedType[0]),
//         })
//       );
//     }
//   }

//   function handleSubmit(e) {
//     e.preventDefault();
//     dispatch(postPokemon(input));
//     for (let i = 0; i < input.types.length; i++) {
//       document.getElementById(input.types[i]).checked = false;
//     }
//     setInput({
//       name: "",
//       hp: 0,
//       str: 0,
//       def: 0,
//       spd: 0,
//       height: 0,
//       weight: 0,
//       image: "",
//       types: [],
//     });
//     //dispatch(getPokemons());
//     //navigate('/home');
//   }

//   useEffect(() => {
//     dispatch(getTypes());
//   }, [dispatch]);

//   return (
//     <div>
//       <nav className="navBar">
//         <Link to="/home">
//           <img src={pokemonLogo} className="imgHome" alt="Img not found" />
//         </Link>
//         <Link to="/home">
//           <button className="buttonNav">Back home</button>
//         </Link>
//       </nav>
//       <div className="container">
//         <div className="signup-content">
//           <div className="signup-form">
//             <form
//               className="register-form"
//               id="register-form"
//               onSubmit={(e) => handleSubmit(e)}
//             >
//               <h2 className="h2TitleCreate">POKEMON CREATOR</h2>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Name:</label>
//                   <input
//                     type="text"
//                     value={input.name}
//                     name="name"
//                     placeholder="Insert name"
//                     onChange={(e) => handleChange(e)}
//                   />
//                 </div>
//                 <div className="form-group">
//                   {errors.name && (
//                     <div className="form-errors">{errors.name}</div>
//                   )}
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Health Points:</label>
//                   <input
//                     type="number"
//                     value={input.hp}
//                     name="hp"
//                     placeholder="0"
//                     onChange={(e) => handleChange(e)}
//                   />
//                 </div>
//                 <div className="form-group">
//                   {errors.hp && <div className="form-errors">{errors.hp}</div>}
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Strength:</label>
//                   <input
//                     type="number"
//                     value={input.str}
//                     name="str"
//                     placeholder="0"
//                     onChange={(e) => handleChange(e)}
//                   />
//                 </div>
//                 <div className="form-group">
//                   {errors.str && (
//                     <div className="form-errors">{errors.str}</div>
//                   )}
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Defense:</label>
//                   <input
//                     type="number"
//                     value={input.def}
//                     name="def"
//                     placeholder="0"
//                     onChange={(e) => handleChange(e)}
//                   />
//                 </div>
//                 <div className="form-group">
//                   {errors.def && (
//                     <div className="form-errors">{errors.def}</div>
//                   )}
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Speed:</label>
//                   <input
//                     type="number"
//                     value={input.spd}
//                     name="spd"
//                     placeholder="0"
//                     onChange={(e) => handleChange(e)}
//                   />
//                 </div>
//                 <div className="form-group">
//                   {errors.spd && (
//                     <div className="form-errors">{errors.spd}</div>
//                   )}
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Height:</label>
//                   <input
//                     type="number"
//                     value={input.height}
//                     name="height"
//                     placeholder="0"
//                     onChange={(e) => handleChange(e)}
//                   />
//                 </div>
//                 <div className="form-group">
//                   {errors.height && (
//                     <div className="form-errors">{errors.height}</div>
//                   )}
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Weight:</label>
//                   <input
//                     type="number"
//                     value={input.weight}
//                     name="weight"
//                     placeholder="0"
//                     onChange={(e) => handleChange(e)}
//                   />
//                 </div>
//                 <div className="form-group">
//                   {errors.weight && (
//                     <div className="form-errors">{errors.weight}</div>
//                   )}
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Image:</label>
//                   <input
//                     type="text"
//                     value={input.image}
//                     name="image"
//                     placeholder="Insert image URL"
//                     onChange={(e) => handleChange(e)}
//                   />
//                 </div>
//                 <div className="form-group">
//                   {errors.image && (
//                     <div className="form-errors">{errors.image}</div>
//                   )}
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Types:</label>
//                 </div>
//               </div>
//               <div className="form-row-cb">
//                 <div className="form-group-cb">
//                   {allTypes.map((e) => {
//                     return (
//                       <div className="div-cb" key={e.id}>
//                         <input
//                           className="inpCheckbox"
//                           type="checkbox"
//                           name={e.name}
//                           value={e.name}
//                           id={e.id}
//                           key={e.name}
//                           onChange={(e) => handleCheckBoxOnChange(e)}
//                         ></input>
//                         <label key={e.id * 100}>{e.name}</label>
//                       </div>
//                     );
//                   })}
//                 </div>
//                 <div className="form-errors-cb">
//                   {errors.types && <p>{errors.types}</p>}{" "}
//                 </div>
//               </div>
//               <div className="form-row-submit">
//                 <button
//                   type="submit"
//                   className="buttonSubmit"
//                   disabled={!isEnabled}
//                 >
//                   Create your Pokemon
//                 </button>
//               </div>
//             </form>
//           </div>
//           <div className="signup-img">
//             <img src={professorOak} alt="Img not found" />
//           </div>
//         </div>
//       </div>
//       <div className="footer"></div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { postPokemon, getTypes } from "../../Redux/Action";

function validate(input) {
  let errors = {};
  let nameRequiere = /^[a-zA-Z]+$/;
  let numbers = /^[0-9]*[1-9][0-9]*$/;
  let urlValidate = /\.(gif|jpeg|jpg|png)$/i;

  if (!input.name) {
    errors.name = "Requiere Nombre";
  } else if (input.name.length < 2 || input.name.length > 20) {
    errors.name = "El nombre deberia contener entre 2 y 20 caracteres";
  } else if (!nameRequiere.test(input.name)) {
    errors.name = "El nombre solo pueden ser letras";
  }
  if (!input.hp || input.hp === 0) {
    errors.hp = "Ingrese Salud";
  } else if (!numbers.test(input.hp)) {
    errors.hp = "Salud deberia ser un entero positivo";
  }
  if (!input.str || input.str === 0) {
    errors.str = "Ingrese Fuerza";
  } else if (!numbers.test(input.str)) {
    errors.str = "Fuerza deberia ser un entero positivo";
  }
  if (!input.def || input.def === 0) {
    errors.def = "Ingrese Defensa";
  } else if (!numbers.test(input.def)) {
    errors.def = "Defensa deberia ser un entero positivo";
  }
  if (!input.spd || input.spd === 0) {
    errors.spd = "Ingrese Velocidad";
  } else if (!numbers.test(input.spd)) {
    errors.spd = "Velocidad deberia ser un entero positivo";
  }
  if (!input.height || input.height === 0) {
    errors.height = "Ingrese Altura";
  } else if (!numbers.test(input.height)) {
    errors.height = "Altura deberia ser un entero positivo";
  }
  if (!input.weight || input.weight === 0) {
    errors.weight = "Ingrese Peso";
  } else if (!numbers.test(input.weight)) {
    errors.weight = "Peso deberia ser un entero positivo";
  }
  if (!input.image) {
    errors.image = "Se requiere imagen";
  } else if (!urlValidate.test(input.image)) {
    errors.image = "Coloque un URL valida";
  }
  if (input.types.length === 0) {
    errors.types = "Se requiere el tipo de pokemon";
  } else if (input.types.length > 2) {
    errors.types = "Un pokemon no puede tener mas de 2 tipos";
  }
  return errors;
}
export default function PokemonCreated() {
  const dispatch = useDispatch();

  const allTypes = useSelector((state) => state.types);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    hp: 0,
    str: 0,
    def: 0,
    spd: 0,
    height: 0,
    weight: 0,
    image: "",
    types: [],
  });
  const isEnabled = Object.keys(errors).length === 0 && input.name !== "";
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  function handleCheckBox(e) {
    let clickedType = allTypes
      .filter((el) => e.target.value === el.name)
      .map((el) => el.id);
    if (e.target.checked) {
      setInput({
        ...input,
        types: [...input.types, ...clickedType],
      });
      setErrors(
        validate({
          ...input,
          types: input.types.filter((e) => e !== clickedType[0]),
        })
      );
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postPokemon(input));
    for (let i = 0; i < input.types.length; i++) {
      document.getElementById(input.types[i]).checked = false;
    }
    setInput({
      name: "",
      hp: 0,
      str: 0,
      def: 0,
      spd: 0,
      height: 0,
      weight: 0,
      image: "",
      types: [],
    });
  }
  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  return (
    <div>
      <div className="container">
        <div className="siginup-content">
          <nav>
            <Link to="/home">
              <button className="buttonNav">Volver</button>
            </Link>
          </nav>
          <div className="signup-form">
            <form
              className="register-form"
              id="register-form"
              onSubmit={(e) => handleSubmit(e)}
            >
              <h2 className="tituloCreate">Creador de Pokemons</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>Nombre:</label>
                  <input
                    type="text"
                    value={input.name}
                    name="name"
                    placeholder="Ingrese Nombre"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="form-group">
                  {errors.name && <div className="formErr">{errors.name}</div>}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Health Points:</label>
                  <input
                    type="number"
                    value={input.hp}
                    name="hp"
                    placeholder="0"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="form-group">
                  {errors.hp && <div className="form-errors">{errors.hp}</div>}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Strength:</label>
                  <input
                    type="number"
                    value={input.str}
                    name="str"
                    placeholder="0"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="form-group">
                  {errors.str && (
                    <div className="form-errors">{errors.str}</div>
                  )}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Defense:</label>
                  <input
                    type="number"
                    value={input.def}
                    name="def"
                    placeholder="0"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="form-group">
                  {errors.def && (
                    <div className="form-errors">{errors.def}</div>
                  )}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Speed:</label>
                  <input
                    type="number"
                    value={input.spd}
                    name="spd"
                    placeholder="0"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="form-group">
                  {errors.spd && (
                    <div className="form-errors">{errors.spd}</div>
                  )}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Height:</label>
                  <input
                    type="number"
                    value={input.height}
                    name="height"
                    placeholder="0"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="form-group">
                  {errors.height && (
                    <div className="form-errors">{errors.height}</div>
                  )}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Weight:</label>
                  <input
                    type="number"
                    value={input.weight}
                    name="weight"
                    placeholder="0"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="form-group">
                  {errors.weight && (
                    <div className="form-errors">{errors.weight}</div>
                  )}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Image:</label>
                  <input
                    type="text"
                    value={input.image}
                    name="image"
                    placeholder="Insert image URL"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="form-group">
                  {errors.image && (
                    <div className="form-errors">{errors.image}</div>
                  )}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Types:</label>
                </div>
                <div className="form-group-2">
                  {allTypes.map((e) => {
                    return (
                      <div className="divgroup" key={e.id}>
                        <input
                          type="checkbox"
                          name={e.name}
                          value={e.name}
                          id={e.id}
                          key={e.name}
                          onChange={(e) => handleCheckBox(e)}
                        ></input>
                        <label key={e.id * 100}>{e.name}</label>
                      </div>
                    );
                  })}
                </div>
                <div className="form-errors-cb">
                  {errors.types && <p>{errors.types}</p>}{" "}
                </div>
              </div>
              <div className="form-row-submit">
                <button
                  type="submit"
                  className="buttonSubmit"
                  disabled={!isEnabled}
                >
                  CREAR
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
