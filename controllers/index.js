let express = require("express");
let router = express.Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
const requiresLogin = require("../service/auth");

router.use("/api/orders", requiresLogin, require("./orders"));
router.use("/api/order", requiresLogin, require("./orderedItem"));
router.use("/api/doc", swaggerUi.serve);
router.get("/api/doc", swaggerUi.setup(swaggerDocument));
router.use("/api/items", requiresLogin, require("./item"));

router.use("/api/auth", require("./users"));

/*eslint-disable */
router.use(function(err, req, res, next){ 
    if(err) {
        let {status, message} = err;
        res.status(status).send(message);
    }
});
/*eslint-enable */
module.exports = router;