import React from 'react'
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const schema = Yup.object().shape({
  firstName: Yup.string().required(),
  age: Yup.number().typeError('you must specify a number').positive().integer().required(),
});

function Test(){
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
      });
    const onSubmit = data => console.log(data);
    return(
        <section className="p404">
        <h1>test react hook form</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} />
      <p>{errors.firstName?.message}</p>
        
      <input {...register("age")} />
      <p>{errors.age?.message}</p>
      
      <input type="submit" />
    </form>
    <h1>test formik</h1>
    <Formik
       initialValues={{ email: '', password: '' }}
       validate={values => {
         const errors = {};
         if (!values.email) {
           errors.email = 'Required';
         } else if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         ) {
           errors.email = 'Invalid email address';
         }
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           setSubmitting(false);
         }, 400);
       }}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => {
        console.log(touched)   
        return(
           
         <form onSubmit={handleSubmit}>
           <input
             type="email"
             name="email"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.email}
           />
           {errors.email && touched.email && errors.email}
           <input
             type="password"
             name="password"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.password}
           />
           {errors.password && touched.password && errors.password}
           <button type="submit" disabled={isSubmitting}>
             Submit
           </button>
         </form>
       )}}
     </Formik>
     <h1>test formik 2</h1>
     <Formik
       initialValues={{ firstName: '', lastName: '', email: '' }}
       validationSchema={Yup.object({
         firstName: Yup.string()
           .max(15, 'Must be 15 characters or less')
           .required('Required'),
         lastName: Yup.string()
           .max(20, 'Must be 20 characters or less')
           .required('Required'),
         email: Yup.string().email('Invalid email address').required('Required'),
       })}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           setSubmitting(false);
         }, 400);
       }}
     >
       {formik => (
         <form onSubmit={formik.handleSubmit}>
           <label htmlFor="firstName">First Name</label>
           <Field type="text" name="firstName" id="firstName"/>
          
           {formik.touched.firstName && formik.errors.firstName ? (
             <div>{formik.errors.firstName}</div>
           ) : null}
 
           <label htmlFor="lastName">Last Name</label>
           <input
             id="lastName"
             type="text"
             {...formik.getFieldProps('lastName')}
           />
           {formik.touched.lastName && formik.errors.lastName ? (
             <div>{formik.errors.lastName}</div>
           ) : null}
 
           <label htmlFor="email">Email Address</label>
           <input id="email" type="email" {...formik.getFieldProps('email')} />
           {formik.touched.email && formik.errors.email ? (
             <div>{formik.errors.email}</div>
           ) : null}
 
           <button type="submit">Submit</button>
         </form>
       )}
     </Formik>
      </section>
    )
}

export default Test