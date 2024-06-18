const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Empleado, Solicitud } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Create Empleado
app.post('/empleado', async (req, res) => {
  try {
    const { fecha_ingreso, nombre, salario} = req.body;
    const empleado = await Empleado.create({ fecha_ingreso, nombre, salario });
    res.json(empleado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating empleado' });
  }
});

// Read Empleado
app.get('/empleado', async (req, res) => {
  try {
    const empleados = await Empleado.findAll();
    res.json(empleados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching empleados' });
  }
});

// Update Empleado
app.put('/empleado/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { fecha_ingreso, nombre, salario } = req.body;
    const empleado = await Empleado.update({ fecha_ingreso, nombre, salario }, { where: { id } });
    res.json(empleado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating empleado' });
  }
});

// Delete Empleado
app.delete('/empleado/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Empleado.destroy({ where: { id } });
    res.json({ message: 'Empleado deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting empleado' });
  }
});

// Create Solicitud
app.post('/solicitud', async (req, res) => {
  try {
    const { codigo, descripcion, resumen, id_empleado } = req.body;
    const solicitud = await Solicitud.create({ codigo, descripcion, resumen, id_empleado });
    res.json(solicitud);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating solicitud' });
  }
});

// Read Solicitud
app.get('/solicitud', async (req, res) => {
  try {
    const solicitudes = await Solicitud.findAll();
    res.json(solicitudes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching solicitudes' });
  }
});

// Update Solicitud
app.put('/solicitud/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { codigo, descripcion, resumen, id_empleado } = req.body;
    const solicitud = await Solicitud.update({ codigo, descripcion, resumen, id_empleado }, { where: { id } });
    res.json(solicitud);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating solicitud' });
  }
});

// Delete Solicitud
app.delete('/solicitud/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Solicitud.destroy({ where: { id } });
    res.json({ message: 'Solicitud deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting solicitud' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});