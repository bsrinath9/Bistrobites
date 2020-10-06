import React, { Component } from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb,BreadcrumbItem, Label,Col,Row,Button,Modal ,ModalHeader, ModalBody,Form,FormGrup,InputGroup} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';
import { Loading } from './LoadingComponent';
    


    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) =>  val && (val.length >= len);

    class CommentForm extends Component {
        constructor(props){
            super(props);

            this.state ={

                isModalOpen : false
            };

            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        toggleModal(){
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
    
        }

        handleSubmit(values){
            this.toggleModal();
            this.props.addComment(this.props.dishId, values.rating, values.author,values.comment);
            
        }
    
            
        render(){
        return ( 
            <div>          
            <Button outline onClick={this.toggleModal}><span className="fa fa-pencil" /> Submit Comment</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>

                <ModalBody>

                    <LocalForm onSubmit={this.handleSubmit}>
                        <Row className="form-group">
                            <Label htmlFor="rating" md={12}>Rating</Label>
                            <Col md={12}>
                                <Control.select model=".rating" id="rating" name="rating" className="form-control" >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                </Control.select>

                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="author" md={12}>Your Name</Label>
                            <Col md={12}>
                                <Control.text model=".author" id="author" name="author" placeholder="Your Name" className="form-control" validators={{ minLength: minLength(3), maxLength: maxLength(15) }} />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </Col>
                        </Row>

                        <Row className="form-group">
                            <Label htmlFor="comment" md={12}>Comment</Label>
                            <Col md={12}>
                                <Control.textarea model=".comment" id="comment" name="comment" rows="6" className="form-control" />

                            </Col>
                        </Row>
                        
                        <Button  type="submit" value="submit" color="primary">Submit</Button>
                    </LocalForm>

                </ModalBody>
            </Modal>
            
            </div>
        )

        }
       
    }



    function RenderDish({dish}) {
        if (dish != null) {
            return (
                <div >
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
                </div>
            );

        }
        else {
            return (<div> </div>);
        }

    }

  
    function RenderComments({comments, addComment,dishId}) {
       
        if (comments != null) {


            const comm = comments.map((c) => {

                return (
                   
                    <div>
                        <ul className="list-unstyled">
                            <li key={c.id}>
                                <p>{c.comment}</p>
                                <li>--{c.author},{new Intl.DateTimeFormat("en-US", {year: "numeric",month: "short", day: "2-digit",}).format(new Date(Date.parse(c.date)))} </li>

                            </li>
                        </ul>                                       
                        
                    </div>
                               
                );
               
            });

           
            return (
                <div>
                    <h4>Comments</h4>
                    {comm}
                    <CommentForm dishId={dishId} addComment={addComment} />
                    
                </div>
                
            );
        }
        else {
            return (<div></div>);
        }

    }

            const DishDetail = (props) => {  
                
                if (props.isLoading){
                    return(
                        <div className="container">
                            <div className="row">
                                <Loading />
                            </div>
                        </div>
                    );
                }
                else if (props.errMess){
                    return(
                        <div className="container">
                            <div className="row">
                                <h4>{props.errMess}</h4>
                            </div>
                        </div>
                    );
                }
                

                else if (props.dish != null) {
                    return (
                        <div className="container">
                            <div className="row">
                                <Breadcrumb>
                                    <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                                </Breadcrumb>
                                <div className="col-12">
                                    <h3>{props.dish.name}</h3>
                                    <hr />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12 col-md-5 m-1">
                                    <RenderDish dish={props.dish} />
                                </div>
                                <div className="col-12 col-md-5 m-1">
                                    <RenderComments comments={props.comments} 
                                    dishId={props.dish.id} 
                                    addComment={props.addComment}/>
                                </div>
                               
                            </div>

                        </div>
                    );
                } else {
                    return (<div></div>);
                }
            }


export default DishDetail;