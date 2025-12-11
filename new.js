const sitters = [
  { name: "Цветелина А.", city: "Бургас", price: 31, rating: 5.0 },
  { name: "Стоян П.", city: "Варна", price: 15, rating: 5.0 },
  { name: "Венета К.", city: "Сливен", price: 15, rating: 5.0 },
  { name: "Пролет А.", city: "София", price: 23, rating: 5.0 },
  { name: "Мария Л.", city: "Пловдив", price: 20, rating: 4.8 },
  { name: "Иван Д.", city: "Бургас", price: 18, rating: 4.9 }
];

function displaySitters(list) {
  content.innerHTML = `<h2>Търси гледач</h2>
    <form id="searchForm" style="display:flex; flex-direction:column; gap:12px; max-width:400px; margin-bottom:20px;">
      <input type="text" id="searchCity" placeholder="Град">
      <input type="text" id="searchType" placeholder="Тип гледач (по име/умение)">
      <button type="submit" class="btn primary">Търси</button>
    </form>
    <div class="grid" id="resultsGrid"></div>`;

  const resultsGrid = document.getElementById('resultsGrid');
  list.forEach(s => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<strong>${s.name}</strong> · ${s.city} · ${s.price} лв. · Рейтинг: ${s.rating}`;
    resultsGrid.appendChild(card);
  });

  // Филтър при търсене
  document.getElementById('searchForm').addEventListener('submit', e => {
    e.preventDefault();
    const city = document.getElementById('searchCity').value.toLowerCase();
    const type = document.getElementById('searchType').value.toLowerCase();
    const filtered = sitters.filter(s => 
      s.city.toLowerCase().includes(city) && s.name.toLowerCase().includes(type)
    );
    displaySitters(filtered);
  });
}
document.getElementById('btnFind').addEventListener('click', ()=> {
  displaySitters(sitters);
});


document.getElementById('btnBecome').addEventListener('click', () => {
  content.innerHTML = `<h2>Стани гледач</h2>
    <form id="becomeForm" style="display:flex; flex-direction:column; gap:12px; max-width:400px;">
      <input type="text" id="newName" placeholder="Име">
      <input type="text" id="newCity" placeholder="Град">
      <input type="text" id="newSkills" placeholder="Опит / умения">
      <input type="number" id="newPrice" placeholder="Цена в лв.">
      <button type="submit" class="btn primary">Подай</button>
    </form>
    <div id="successMsg" style="margin-top:12px;color:green;font-weight:600;"></div>`;

  document.getElementById('becomeForm').addEventListener('submit', e => {
    e.preventDefault();
    
    const name = document.getElementById('newName').value.trim();
    const city = document.getElementById('newCity').value.trim();
    const skills = document.getElementById('newSkills').value.trim();
    const price = parseFloat(document.getElementById('newPrice').value);

    if (!name || !city || !skills || isNaN(price)) {
      alert("Моля, попълнете всички полета правилно.");
      return;
    }

    // Добавяме новия гледач към масива
    sitters.push({ name: `${name} (${skills})`, city, price, rating: 5.0 });

    // Показваме съобщение за успех
    document.getElementById('successMsg').textContent = `${name} е добавен успешно!`;

    // Изчистваме формата
    document.getElementById('becomeForm').reset();
  });
});

// След добавяне на гледач:
document.getElementById('successMsg').textContent = `${name} е добавен успешно! Пренасочване към Търси гледач...`;
setTimeout(() => {
  displaySitters(sitters); // показва списъка с всички гледачи
}, 1500);


// Регистрация според ролята
document.getElementById('regForm').addEventListener('submit', e => {
  e.preventDefault();

  const selectedRole = document.querySelector('input[name="role"]:checked');

  if(!selectedRole) {
    alert('Моля, изберете ролята си (служител или потребител).');
    return;
  }

  const role = selectedRole.value;

  if(role === 'employee') {
    // Пренасочване към becomeSitter.html
    window.location.href = 'becomeSitter.html';
  } else {
    // Отваряне на popup за user
    document.getElementById('userPopup').style.display = 'flex';
  }
});

// Затваряне на popup
document.getElementById('closePopup').addEventListener('click', () => {
  document.getElementById('userPopup').style.display = 'none';
});

// Изпращане на user форма
document.getElementById('userForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = e.target.name.value.trim();
  const email = e.target.email.value.trim();
  const phone = e.target.phone.value.trim();
  const animals = Array.from(e.target.animals)
                       .filter(a => a.checked)
                       .map(a => a.value);

  // Валидация
  const phoneRegex = /^\+359[0-9]{8,9}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(!name || !email || !phone || animals.length === 0){
    alert('Моля, попълнете всички полета.');
    return;
  }

  if(!emailRegex.test(email)){
    alert('Моля, въведете валиден имейл.');
    return;
  }

  if(!phoneRegex.test(phone)){
    alert('Телефонът трябва да започва с +359 и да съдържа 8–9 цифри след това.');
    return;
  }

  alert(`Регистрацията е успешна!\nИме: ${name}\nИмейл: ${email}\nЖивотни: ${animals.join(', ')}\nТелефон: ${phone}`);
  e.target.reset();
  document.getElementById('userPopup').style.display = 'none';
});
