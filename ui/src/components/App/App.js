import React, { Component } from "react"
import styled, { injectGlobal } from "styled-components"
import { connect } from "react-redux"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import getMuiTheme from "material-ui/styles/getMuiTheme"
import Homepage from "components/Homepage/Homepage"
import Topbar from "components/Topbar/Topbar"
import Content from "components/Content/Content"

injectGlobal`
body {
	margin: 0;
	font-family: 'Indie Flower', cursive;
	display: flex;
	color: #fff;
	background-color: #4f4f4f;
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='%232f2f2f' fill-opacity='0.25' fill-rule='nonzero'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
`

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: "#4f4f4f",
        accent1Color: "#3f3f3f",
        textColor: "#ffffff",
        primary2Color: "dfdfdf",
        pickerHeaderColor: "#4f4f4f"
    }
})

const componentMap = {
    HOME: <Homepage />
}

const createComponent = (componentMap, location) => componentMap[location]

class App extends Component {
    render() {
        const content = createComponent(componentMap, this.props.location)
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <Content content={content} />
                </div>
            </MuiThemeProvider>
        )
    }
}

const mapStateToProps = state => ({
    location: state.location.type
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(App)
