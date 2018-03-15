import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  Container, 
  Header, 
  Card, 
  Image, 
  Dropdown,
  Button,
  Divider,
} from 'semantic-ui-react';
import AppForm from './AppForm';

class Apps extends React.Component {
  state = { name: '', showForm: false }

  toggleForm = () => {
    this.setState( state => {
      return { showForm: !state.showForm }
    });
  }

  apps = () => {
    const { apps } = this.props;
    const { name } = this.state;
    let visible = apps;

    if (name)
      visible = apps.filter( a => a.name === name )
    return visible.map( app =>
      <Card key={app.id}>
        <Image src={app.image} />
        <Card.Content>
          <Card.Header>
            {app.name}
          </Card.Header>
          <Card.Description>
            {app.Description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Link to={`/apps/${app.id}`}>
            View App
          </Link>
        </Card.Content>
      </Card>
    )
  }

  clearname = () => {
    this.setState({ name: '' })
  }

  handleChange = (e, {value}) => {
    this.setState({ name: value })
  }

  nameOptions = () => {
    const { names } = this.props;
    return names.map( (c,i) => {
      return { key: i, text: c, value: c }
    })
  }

  render() {
    const { name, showForm } = this.state;
    return (
      <Container>
        <Header as="h3" textAlign="center">Apps</Header>
        <Button onClick={this.toggleForm}>
          { showForm ? "Hide Form" : "Show Form" }
        </Button>
        { showForm ?
          <AppForm closeForm={this.toggleForm} />
          :
          <div>
            <Dropdown
              placeholder="Filter By name"
              fluid
              selection
              options={this.nameOptions()}
              value={name}
              onChange={this.handleChange}
            />
            { name && 
                <Button 
                  fluid 
                  basic
                  onClick={this.clearname}
                 >
                   Clear Filter: {name}
                 </Button>
            }
            <Divider />
            <Card.Group itemsPerRow={4}>
              { this.apps() }
            </Card.Group>
          </div>
        }
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  const { apps } = state
  const names = [...new Set(apps.map( a => a.name))]
  return { apps, names }
}

export default connect(mapStateToProps)(Apps);

