const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const create = async (req, res) => {
    try{
    const {id, os, colaborador, comentario, data} = req.body;
    const comentarios = await prisma.comentario.create({
        data:{ 
            id: id,
            os: os,
            colaborador: colaborador,
            comentario: comentario,
            data: data
        }
    });
    return res.status(201).json(comentarios)
} catch(error){
    return res.status(400).json({ message: error.message });
}
};

const read = async (req, res) => {
    if(req.params.id !== undefined){
        const comentario = await prisma.comentario.findUnique({
            where:{
                id: parseInt(req.params.id)
            }
        });
        return res.json(comentario);
    } else {
        const comentarios = await prisma.comentario.findMany();
        return res.json(comentarios);
    }
};

const update = async (req, res) => {
    try{
    const comentario = await prisma.comentario.update({
        where:{
            id: req.body.id
        },
        data: req.body
    });
    return res.status(202).json(comentario)
} catch (error){
    return res.status(404).json({ message: "Comentário não encontrado" });
}
};

const del = async (req, res) => {
  try {
    const comentario = await prisma.comentario.delete({
      where: {
        id: parseInt(req.params.id)
      }
    });
    return res.status(204).json(comentario);
  } catch (error) {
    return res.status(404).json({ message: "Comentário não encontrado" });
  }
}
module.exports = {
    create,
    read,
    update,
    del
};