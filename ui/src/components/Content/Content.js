import React, { Component } from "react"
import styled from "styled-components"
import TextField from "material-ui/TextField"
import RaisedButton from "material-ui/RaisedButton"
import ContentAddBox from "material-ui/svg-icons/content/add-box"
import ActionDelete from "material-ui/svg-icons/action/delete"
import CommunicationImportContacts from "material-ui/svg-icons/communication/import-contacts"

const Root = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 2px;
    width: 45%;
    height: 95%;
    background-color: #6f6f6f;
    left: 27.5%;
    top: 2.5%;
`

const TitleDiv = styled.div`
    position: relative;
    width: 90%;
    height: 15%;
    margin-left: 5%;
    font-size: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    //border: 1px solid;
`

const Book = styled(CommunicationImportContacts)`
    position: relative;
    margin-right: 20px;
    cursor: pointer;
`

const Body = styled.div`
    //border: 1px solid;
    width: 90%;
    height: 70%;
    margin-left: 5%;
    margin-top: 10px;
    overflow-y: auto;
    font-size: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Actions = styled.div`
    //border: 1px solid;
    width: 90%;
    height: 8%;
    margin-left: 5%;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

const RecipeDiv = styled.div`
    width: 94%;
    height: 96%;
    //border: 1px solid;
`

const ListDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;

    & > * {
        flex-grow: 0;
        flex-shrink: 0;
    }
`

const ListItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    margin-bottom: 3px;
    cursor: pointer;

    ${props => `
  background-color: ${props.bg};
  `};
`

const ItemTitle = styled.div`
    position: relative;
    font-size: 30px;
    display: flex;
    align-items: space-between;
    margin-left: 10px;
`

const Delete = styled(ActionDelete)`margin-right: 10px;`

class RecipeList extends Component {
    createRecipes = items => {
        const bg1 = "#4f4f4f"
        const bg2 = "#5f5f5f"
        let colorFlag = true

        return items.map(item => {
            let bg = colorFlag ? bg1 : bg2
            colorFlag = !colorFlag
            return (
                <ListItem bg={bg} {...item}>
                    <ItemTitle> ☠ {item.title} </ItemTitle>
                    <Delete />
                </ListItem>
            )
        })
    }

    render() {
        let recipes = this.createRecipes([
            { title: "pizza" },
            { title: "macarrão" },
            { title: "bolo" },
            { title: "licor" }
        ])
        return <ListDiv>{recipes}</ListDiv>
    }
}

const Lvl1 = styled.p`font-size: 30px;`

const Lvl2 = styled.div`
    font-size: 22px;
    margin-left: 30px;
    display: flex;
    flex-direction: column;
`

const searchStyle = {
    width: "450px"
}

const hintStyle = {
    color: "#afafaf"
}

class Recipe extends Component {
    render() {
        let ings
        if (this.props.ings) {
            ings = this.props.ings.map(ing => (
                <p>
                    {" "}
                    ☠ {ing.amount}
                    {ing.unit} de {ing.name}{" "}
                </p>
            ))
        }
        return (
            <RecipeDiv>
                <Lvl1> ☠ Ingredientes: </Lvl1>
                <Lvl2>{ings}</Lvl2>
                <Lvl1> ☠ Descrição: </Lvl1>
                <Lvl2>{this.props.description}</Lvl2>
            </RecipeDiv>
        )
    }
}

class SearchField extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ""
        }
    }

    handleChange = event => {
        this.setState({
            value: event.target.value
        })
    }

    render() {
        return (
            <div>
                <TextField
                    value={this.state.value}
                    onChange={this.handleChange}
                    hintText={"Buscar..."}
                    style={searchStyle}
                    hintStyle={hintStyle}
                />
            </div>
        )
    }
}

class Title extends Component {
    render() {
        return (
            <TitleDiv>
                <Book />
                <p>{this.props.content}</p>
            </TitleDiv>
        )
    }
}

const ex = [
    {
        amount: 500,
        unit: "g",
        name: "Farinha de Trigo"
    },
    {
        amount: 320,
        unit: "mL",
        name: "Água"
    }
]

const d =
    "sadkjskfjk jsdkfjlksjd flkjsdlfjlsdjfklsjdkf jskdfj klsjfkj skldjf lksjdlf jskljflksjdfkljsdlkjf lksdjkl fjslkdjflkjsdlfj lksdj flksjdlkfjslkdjflksjlkfjslkdfjlksjflksjdklfjsldkjfklsjdlkfjslk fjlskdjflks"

class Content extends Component {
    render() {
        const search = <SearchField />
        return (
            <Root>
                <Title content={search} />
                <Body>
                    <RecipeList />
                </Body>
                <Actions>
                    <RaisedButton
                        label="Receita"
                        secondary={true}
                        icon={<ContentAddBox />}
                    />
                    <RaisedButton
                        label="Ingrediente"
                        primary={true}
                        icon={<ContentAddBox />}
                        style={{ marginLeft: "10px" }}
                    />
                </Actions>
            </Root>
        )
    }
}

export default Content
