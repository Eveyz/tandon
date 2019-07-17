import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'

import { FlashMessage } from '../helper/FlashMessage'

const ConceptForm = (props) =>{

  const submit = (values) => {
    props.submit(values)
  }

  return  <Formik
            initialValues={{ 
              name: props.name || '', 
              description: props.description || ''
            }}
            onSubmit={(values, { setSubmitting }) => {
              submit(values);
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string()
                .required('Name cannot be empty'),
            })}
          >
            {props => {
              const {
                touched,
                errors,
                handleChange,
                handleBlur,
                handleSubmit,
              } = props;
              return (
                <form onSubmit={handleSubmit}>
                  {errors.name && touched.name && <FlashMessage props={{status: "error", msg: errors.name}} />}

                  <div className="row no-margin">
                    <div className="input-field col m12 s12">
                      <input 
                        type="text" 
                        name="name" 
                        id="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="validate"
                      />
                      <label htmlFor="name">Name <span className="required">*</span></label>
                    </div>
                  </div>

                  <div className="row no-margin">
                    <div className="input-field col m12 s12">
                      <input 
                        type="text" 
                        name="display_name" 
                        id="display_name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="validate"
                      />
                      <label htmlFor="display_name">Display name <span className="required">*</span></label>
                    </div>
                  </div>

                  <div className="row no-margin">
                    <div className="input-field col m12 s12">
                      <input 
                        type="text" 
                        name="concept_type"
                        id="concept_type"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="validate"
                      />
                      <label htmlFor="concept_type">Concept type <span className="required">*</span></label>
                    </div>
                  </div>

                  <div className="row no-margin">
                    <div className="input-field col m12 s12">
                      <input 
                        type="text" 
                        name="parent"
                        id="parent"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="validate"
                      />
                      <label htmlFor="parent">Parent concept name <span className="required">*</span></label>
                    </div>
                  </div>

                  <div className="row no-margin">
                    <div className="input-field col m12 s12">
                      <input 
                        type="text" 
                        name="description"
                        id="description"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="validate"
                      />
                      <label htmlFor="description">Description</label>
                    </div>
                  </div>

                  <div className="row no-margin">
                    <div className="input-field col m6 s12">
                      <input 
                        type="number" 
                        name="min"
                        id="min"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="validate"
                      />
                      <label htmlFor="min">min</label>
                    </div>
                    <div className="input-field col m6 s12">
                      <input 
                        type="number" 
                        name="max"
                        id="max"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="validate"
                      />
                      <label htmlFor="max">max</label>
                    </div>
                  </div>

                  <br/>
                  <div className="row no-margin">
                    <div className="input-field col m6 s12">
                      <button type="submit" className="btn">Submit</button>
                    </div>
                    <div className="input-field col m6 s12">
                      <Link to={"/concepts"} className="btn white black-text right">Cancel</Link>
                    </div>
                  </div>

                </form>
              );
            }}
          </Formik>
}

export default ConceptForm