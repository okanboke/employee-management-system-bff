const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
//const cookieParser = require('cookie-parser'); //öğrenilecek

const app = express();
const port = 3001;
const baseUrl = "http://localhost:8080"; //backend url

app.use(bodyParser.json());



//admin login | Backend: AuthController

app.post('/api/auth/login', (req, res) => { //isteği alır ve aşağıda axios'a yönlendirir.
  const { userName, password } = req.body;

  // Özel bir BFF işlemi gerçekleştirebilirsiniz
  // Bu örnekte isteği alıp bir backend API'ya yönlendiriyoruz
  axios.post(`${baseUrl}/api/auth/login`, { userName, password })
    .then(response => {
      res.status(response.status).json(response.data);
    })
    .catch(error => {
      res.status(500).json({ message: 'BFF işleminde hata oluştu' });
    });
});

//user Login login | Backend: AuthController
app.post('/api/auth/user/login', (req, res) => {
  const { userName, password } = req.body;

  // Özel bir BFF işlemi gerçekleştirebilirsiniz
  // Bu örnekte isteği alıp bir backend API'ya yönlendiriyoruz
  axios.post(`${baseUrl}/api/auth/user/login`, { userName, password })
    .then(response => {
      res.status(response.status).json(response.data);
    })
    .catch(error => {
      res.status(500).json({ message: 'BFF işleminde hata oluştu' });
    });
});

//Frontend: CreateUser admin user ekleme | Backend: AuthController
app.post('/api/auth/admin/create-user', (req, res) => {
  const { headers } = req;
  const { firstName, lastName, userName, password, userDate} = req.body;

  //İsteği alıp bir backend API'ya yönlendiriyoruz
  axios.post(`${baseUrl}/api/auth/admin/create-user`, { firstName, lastName, userName, password, userDate}, { headers })
  .then(response => {
    res.status(response.status).json(response.data);
  })
  .catch(error => {
    res.status(500).json({ message: 'BFF katmanında admin user ekleme işleminde hata oluştu' });
  });
});

//user Profile bilgi görüntüleme | Backend: EmployeeController
app.get('/api/employee/profile/:path', (req, res) => {
  const { path } = req.params;
  const { headers } = req;

  //İsteği alıp bir backend API'ya yönlendiriyoruz
  axios.get(`${baseUrl}/api/employee/profile/${path}`, { headers })
    .then(response => {
      res.status(response.status).json(response.data);
    })
    .catch(error => {
      res.status(500).json({ message: 'BFF işleminde hata oluştu' });
    });
});

//user Profile bilgi görüntüleme | Backend: EmployeeController
app.get('/api/employee/profile/address/:path', (req, res) => {
  const { path } = req.params;
  const { headers } = req;

  //İsteği alıp bir backend API'ya yönlendiriyoruz
  axios.get(`${baseUrl}/api/employee/profile/address/${path}`, { headers })
    .then(response => {
      res.status(response.status).json(response.data);
    })
    .catch(error => {
      res.status(500).json({ message: 'BFF işleminde hata oluştu' });
    });
});

//user Profile adress ekleme isteği | Backend: EmployeeController
app.get('/api/employee/profile/address/currentuser/:addressId', (req, res) => {
  const { addressId } = req.params;
  const { headers } = req;

  //İsteği alıp bir backend API'ya yönlendiriyoruz
  axios.get(`${baseUrl}/api/employee/profile/address/currentuser/${addressId}`, { headers })
    .then(response => {
      res.status(response.status).json(response.data);
    })
    .catch(error => {
      res.status(500).json({ message: 'BFF işleminde hata oluştu' });
    });
});

//user Profile adress ekleme | Backend: EmployeeController
app.post('/api/employee/edit-profile', (req, res) => {
  const { id, country, city, district, street, apartmentNumber, doorNumber } = req.body;
  const { headers } = req;

  // Bu örnekte isteği alıp bir backend API'ya yönlendiriyoruz
  axios.post(`${baseUrl}/api/employee/edit-profile`, { id, country, city, district, street, apartmentNumber, doorNumber }, { headers })
    .then(response => {
      res.status(response.status).json(response.data);
    })
    .catch(error => {
      res.status(500).json({ message: 'BFF işleminde hata oluştu' });
    });
});

//user Profile adress güncelleme | Backend: EmployeeController
app.put('/api/employee/update-address', (req, res) => {
  const { id, country, city, district, street, apartmentNumber, doorNumber } = req.body;
  const { headers } = req;

  // Bu isteği alıp bir backend API'ya yönlendiriyoruz
  axios.put(`${baseUrl}/api/employee/update-address`, { id, country, city, district, street, apartmentNumber, doorNumber }, { headers })
    .then(response => {
      res.status(response.status).json(response.data);
    })
    .catch(error => {
      res.status(500).json({ message: 'BFF işleminde hata oluştu' });
    });
});

//Frontend: ListJustPermissions user izin görüntüleme | Backend: JustificationController
app.post('/api/permissions/user/list-permissions', (req, res) => {
  const { id } = req.body;
  const { headers } = req;

  // Bu isteği alıp bir backend API'ya yönlendiriyoruz
  axios.post(`${baseUrl}/api/permissions/user/list-permissions`, { id }, { headers })
    .then(response => {
      res.status(response.status).json(response.data);
    })
    .catch(error => {
      res.status(500).json({ message: 'BFF işleminde hata oluştu' });
    });
});

//Frontend: JustificationPermission user izin ekleme | Backend: JustificationController
app.post('/api/permissions/create', (req, res) => {
  const { userId, permissionTypeId, permissionDescription, startDate, endDate } = req.body;
  const { headers } = req;

  //Bu isteği alıp bir backend API'ya yönlendiriyoruz
  axios.post(`${baseUrl}/api/permissions/create`, { userId, permissionTypeId, permissionDescription, startDate, endDate }, { headers })
    .then(response => {
      res.status(response.status).json(response.data);
    })
    .catch(error => {
      res.status(500).json({ message: 'BFF işleminde hata oluştu' });
    });
});

//Frontend: JustificationPerRequest admin mazeret izin onaylama put | Backend: JustificationController
app.put('/api/permissions/admin/update-status', (req, res) => {
  const { permissionId, approvalStatus } = req.body;
  const { headers } = req;

  //Bu isteği alıp bir backend API'ya yönlendiriyoruz
  axios.put(`${baseUrl}/api/permissions/admin/update-status`, { permissionId, approvalStatus }, { headers })
    .then(response => {
      res.status(response.status).json(response.data);
    })
    .catch(error => {
      res.status(500).json({ meesage: 'BFF katmanında izin onaylamada hata oluştu' });
    });
});

//Frontend: JustificationPerRequest admin mazeret izin türleri görüntüleme | Backend: JustificationTypeController
app.get('/api/permissions/type/user/list-types', (req, res) => {
  const { headers } = req;

  //Bu isteği alıp bir backend API'ya yönlendiriyoruz
  axios.get(`${baseUrl}/api/permissions/type/user/list-types`, { headers })
  .then(response => {
    res.status(response.status).json(response.data);
  })
  .catch(error => {
    res.status(500).json({ message: 'BFF katmanında izin türlerini görüntülemede hata oluştu'});
  });
});

//Frontend: JustificationPerRequest admin mazeret izin türü ekleme | Backend: JustificatipnTypeControlller
app.post('/api/permissions/type/admin/create-type', (req, res) => {
  const { headers } = req;
  const { justPermissionType } = req.body;

  //Bu isteği alıp bir backend API'ya yönlendiriyoruz
  axios.post(`${baseUrl}/api/permissions/type/admin/create-type`, { justPermissionType }, { headers })
  .then(response => {
    res.status(response.status).json(response.data);
  })
  .catch(error => {
    res.status(500).json({ message: 'BFF katmanında izin türü eklemede bir hata oluştu'});
  });
});

//Frontend: JustificationPerRequest admin arayüze gelen izin isteklerini görüntüleme | Backend: AdminController
app.get('/api/admin/list-justification', (req, res) => {
  const { headers } = req;
  
  //Bu isteği alıp bir backend API'ya yönlendiriyoruz
  axios.get(`${baseUrl}/api/admin/list-justification`, { headers })
  .then(response => {
    res.status(response.status).json(response.data);
  })
  .catch(error => {
    res.status(500).json({ message: 'BFF katmanında admin izin isteklerini görüntülemede bir hata oluştu'});
  });
})

//Frontend: JustificationPermission mazeret izin türlerini görüntüleme | Backend: JustificationTypeController
app.get('/api/permissions/type/user/list-types', (req, res) => {
  const { headers } = req;

  //İsteği alıp bir backend API'ya yönlendiriyoruz
  axios.get(`${baseUrl}/api/permissions/type/user/list-types`, { headers })
    .then(response => {
      res.status(response.status).json(response.data);
    })
    .catch(error => {
      res.status(500).json({ message: 'BFF işleminde hata oluştu' });
    });
});

//Frontend: Home.js admin user görüntüleme | Backend: AdminController
app.get('/api/admin/list-user', (req, res) => {
  const { headers } = req;

  //İsteği alıp bir backend API'ya yönlendiriyoruz
  axios.get(`${baseUrl}/api/admin/list-user`, { headers })
    .then(response => {
      res.status(response.status).json(response.data);
    })
    .catch(error => {
      res.status(500).json({ message: 'BFF admin user görüntülemede bir hata oluştu' });
    });
});


app.listen(port, () => {
  console.log(`BFF sunucusu http://localhost:${port} adresinde çalışıyor`);
});

