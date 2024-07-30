const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken')
require('dotenv').config()

const login = async (req, res) => {
    const {matricula, pin} = req.body 
    const colaborador = await prisma.colaborador.findFirst({
        where:{
            matricula: matricula,
            pin: pin
        }
    });
    if(colaborador){
        const token = await jwt.sign({matricula: colaborador.matricula}, process.env.KEY, {
            expiresIn: 3600
        });
        colaborador.token = token;
        return res.json(colaborador);
    } else {
        return res.status(401).json({message: "Matricula ou pin inválidos"})
    }
};

const read = async (req, res) => {
    if(req.params.matricula){
        const colaborador = await prisma.colaborador.findUnique({
            where:{
                matricula: req.params.matricula
            }
        });
        return res.json(colaborador);
    } else {
        const colaboradores = await prisma.colaborador.findMany();
        return res.json(colaboradores);
    }
};

module.exports = {
    login,
    read
};