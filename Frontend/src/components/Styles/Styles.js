    import green from "@material-ui/core/colors/green";
    import amber from "@material-ui/core/colors/amber";



    const styles = theme => ({
    success: {
        backgroundColor: green[600],
        fontSize: 14
    },
    error: {
        backgroundColor: theme.palette.error.dark,
        fontSize: 14
    },
    warning: {
        backgroundColor: amber[700],
        fontSize: 14
    },
    paper: {
        position: "absolute",
        marginTop: "2%",
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit * 10,
        fontSize: 14,
        margin: "auto"
    },
    root: {
        width: "100%",
        margin: "auto",
            overflowX: "auto",
        marginTop: theme.spacing.unit * 3,
        fontSize: 14
    },
    rootModal: {
        width: "100%",
        margin: "auto",
        marginTop: theme.spacing.unit * 3,
        overflowX: "auto",
        fontSize: 14,
    },
    table: {
        width: "100%",
        fontSize: 14,
            overflowX: "auto",
    },
    modal: {
        // minHeight: "80vh"
    },
    formControl: {
        margin: theme.spacing.unit,
        fontSize: 14,
        // minWidth: 120
    },
    selectEmpty: {
        margin: theme.spacing.unit * 2
    },
    tablecell: {
        fontSize: "12pt"
    },
    tablecell1: {
        fontSize: "12pt",
        width: "30%"
    },
    tablecell2: {
        fontSize: "12pt",
        width: "5%"
    },
    message: {
        display: "flex",
        alignItems: "center"
    },
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: "40%"
    },
    dense: {
        marginTop: 16
    },
    menu: {
        width: 200
    },
    login: {
        marginTop: "2%",
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit * 10,
        fontSize: 14,
        margin: "auto",
        "text-align": "center",
        width: "50%"
    },
    resize: {
        fontSize: 14, 
    },
    fab: {
        position: 'sticky',
        bottom: "10 %",
        marginLeft: "64%",
        // margin: theme.spacing.unit*3,
  },
      fabEdit: {
        // margin: theme.spacing.unit,
  },
    card: {
    // minWidth: 275,
  },
  float: {
	position:"fixed",
	// width:"60px",
	// height:"60px",
	bottom:"50px",
	right:"50px"
  }
    });

    export default styles;