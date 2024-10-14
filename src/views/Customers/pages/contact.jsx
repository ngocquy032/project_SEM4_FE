import React from 'react';
import { ToastError, ToastSuccess } from '../../../notification';
import All_API from '../../../state/All_API';

function Contact() {
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget)
  
        const messageData = {
            name: data.get("name"),
            email: data.get("email"),
            message: data.get("message"),
        }

        sentContact(messageData)
        e.target.reset();

    }
    async function sentContact(messageData) {
        try{
          const response = await All_API.sendContact(messageData)
          if(response.data.status === "success") {
            ToastSuccess(response.data.message)
          }else {
            ToastError(response.data.message)
          }
        }catch (error){
          ToastError(error.response.data.message)
        }
      }

    return (
        <div>

            <section className="page-title bg-1">
                <div className="overlay"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="block text-center">
                                <span className="text-white">Contact Us</span>
                                <h1 className="text-capitalize mb-5 text-lg">Get in Touch</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="section contact-info pb-0">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-sm-6 col-md-6">
                            <div className="contact-block mb-4 mb-lg-0">
                                <i className="icofont-live-support"></i>
                                <h5>Call Us</h5>
                                +823-4565-13456
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 col-md-6">
                            <div className="contact-block mb-4 mb-lg-0">
                                <i className="icofont-support-faq"></i>
                                <h5>Email Us</h5>
                                contact@mail.com
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 col-md-6">
                            <div className="contact-block mb-4 mb-lg-0">
                                <i className="icofont-location-pin"></i>
                                <h5>Location</h5>
                                North Main Street,Brooklyn Australia
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28312.599070075932!2d105.75802003476565!3d21.06064900000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134552a788249df%3A0xd442cb949c5bcf2f!2zTmdoLiAxMTkvNjQgxJAuIEPhu5UgTmh14bq_LCBD4buVIE5odeG6vywgQuG6r2MgVOG7qyBMacOqbSwgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e1!3m2!1svi!2s!4v1722012442012!5m2!1svi!2s"
                width="100%" height="650" style={{border: 0}} allowFullScreen="" loading="lazy"
                referrerPolicy="no-referrer-when-downgrade">

            </iframe>

            <section className="contact-form-wrap section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="section-title text-center">
                                <h2 className="text-md mb-2">Contact us</h2>
                                <div className="divider mx-auto my-4"></div>
                                <p className="mb-5">Laboriosam exercitationem molestias beatae eos pariatur, similique,
                                    excepturi mollitia sit perferendis maiores ratione aliquam?</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <form id="contact-form" className="contact__form " onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="alert alert-success contact__msg" style={{display: "none"}}
                                             role="alert">
                                            Your message was sent successfully.
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <input name="name" id="name" type="text" className="form-control"
                                                  placeholder="Your Full Name"/>

                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <input name="email" id="email" type="email" className="form-control"
                                                   placeholder="Your Email Address"/>
                                        </div>
                                    </div>
                                    
                                   
                                </div>

                                <div className="form-group-2 mb-4">
                                    <textarea name="message" id="message" className="form-control" rows="8"
                                              placeholder="Your Message"></textarea>
                                </div>

                                <div className="text-center">
                                    <input className="btn btn-main btn-round-full" name="submit" type="submit"
                                           value="Send Messege"></input>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    );
}

export default Contact;