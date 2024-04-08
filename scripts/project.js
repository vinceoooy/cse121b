// Fetch image URLs from JSON file and display buttons dynamically
const fetchImagesAndDisplayButtons = async () => {
  const response = await fetch('https://raw.githubusercontent.com/vinceoooy/cse121b/master/project.json');
  const imageData = await response.json();
  
  const buttonsContainer = document.querySelector('.buttons-container');
  
  imageData.forEach(item => {
    const img = document.createElement('img');
    img.src = item.imageUrl;
    img.alt = item.functionName === 'loan' ? 'Loans' : 'Savings';
    img.onclick = item.functionName === 'loan' ? showLoanForm : showSavingsForm;
    buttonsContainer.appendChild(img);
  });
};
  
// Functions to show loan and savings forms (kept from the previous code)
function showLoanForm() {
  document.querySelector('.buttons-container').style.display = 'none';
  document.getElementById('loanForm').style.display = 'block';
  document.getElementById('loanChart').style.display = 'block';
  document.getElementById('savingsChart').style.display = 'none';
  
}

function showSavingsForm() {
  document.querySelector('.buttons-container').style.display = 'none';
  document.getElementById('savingsForm').style.display = 'block';
  document.getElementById('loanChart').style.display = 'none';
  document.getElementById('savingsChart').style.display = 'block';
}

function goBack() {
  document.querySelector('.buttons-container').style.display = 'flex';
  document.getElementById('loanForm').style.display = 'none';
  document.getElementById('savingsForm').style.display = 'none';
  document.getElementById('loanChart').style.display = 'none';
  document.getElementById('savingsChart').style.display = 'none';
}
  
// Call the function to fetch images and display buttons
fetchImagesAndDisplayButtons();

function calculateLoan() {
  var loanAmount = parseFloat(document.getElementById('loanAmount').value);
  var annualInterestRate = parseFloat(document.getElementById('loanInterestRate').value);
  var loanTerm = parseInt(document.getElementById('loanTerm').value);

  var monthlyInterestRate = annualInterestRate / 100 / 12;
  var numberOfPayments = loanTerm * 12;

  var monthlyPayment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

  var totalPayment = monthlyPayment * numberOfPayments;
  var totalInterest = totalPayment - loanAmount;

  // Display result
  document.getElementById('loanResult').innerHTML = "Monthly Payment: $" + monthlyPayment.toFixed(2) + "<br>" +
      "Total Payment: $" + totalPayment.toFixed(2) + "<br>" +
      "Total Interest: $" + totalInterest.toFixed(2);

    // Remove existing savings chart if it exists
    var existingChart = document.getElementById('loanChart');
    if (existingChart) {
        existingChart.parentNode.removeChild(existingChart);
    }

    // Create a new canvas element for the savings chart
    var canvas = document.createElement('canvas');
    canvas.id = 'loanChart';
    document.querySelector('.chart-container').appendChild(canvas);

  // Display graph
  generateLoanChart();
}

function generateLoanChart() {
    var loanAmount = parseFloat(document.getElementById('loanAmount').value);
    var interestRate = parseFloat(document.getElementById('loanInterestRate').value) / 100; // Convert interest rate to decimal
    var loanTerm = parseInt(document.getElementById('loanTerm').value);

    var monthlyInterestRate = interestRate / 12;
    var numberOfPayments = loanTerm * 12;
  
    var monthlyPayment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
  
    var totalPayment = monthlyPayment * numberOfPayments;

  
  
  
    // Perform calculations
    let balance = loanAmount;
    const data = {
        labels: ["Month 0"],
        datasets: [{
            label: "Loan Balance",
            data: [loanAmount],
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1
        }]
    };
    
    for (let i = 1; i <= loanTerm * 12; i++) { // Multiply by 12 to get total months
        data.labels.push("Month " + i);
        balance -= (monthlyPayment - (balance*monthlyInterestRate)); // Compounded monthly
        data.datasets[0].data.push(balance.toFixed(2)); // Round to 2 decimal places and push to data array
    }
  
    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };
  
    // Get the canvas element
    const ctx = document.getElementById('loanChart').getContext('2d');
  
    // Generate the chart
    const myChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });
  }
  

function calculateSavings() {
    var initialDeposit = parseFloat(document.getElementById('initialDeposit').value);
    var monthlyDeposit = parseFloat(document.getElementById('monthlyDeposit').value);
    var annualInterestRate = parseFloat(document.getElementById('savingsInterestRate').value);
    var savingsTerm = parseInt(document.getElementById('savingsTerm').value);

    var monthlyInterestRate = annualInterestRate / 100 / 12;
    var numberOfPayments = savingsTerm * 12;

    var futureValue = initialDeposit * Math.pow(1 + monthlyInterestRate, numberOfPayments) +
        monthlyDeposit * ((Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1) / monthlyInterestRate);

    var totalDeposit = initialDeposit + monthlyDeposit * numberOfPayments;
    var totalInterest = futureValue - totalDeposit;

    // Display result
    document.getElementById('savingsResult').innerHTML = "Future Value: $" + futureValue.toFixed(2) + "<br>" +
        "Total Deposit: $" + totalDeposit.toFixed(2) + "<br>" +
        "Total Interest: $" + totalInterest.toFixed(2);

    // Remove existing savings chart if it exists
    var existingChart = document.getElementById('savingsChart');
    if (existingChart) {
        existingChart.parentNode.removeChild(existingChart);
    }

    // Create a new canvas element for the savings chart
    var canvas = document.createElement('canvas');
    canvas.id = 'savingsChart';
    document.querySelector('.chart-container').appendChild(canvas);

    // Generate chart with new data
    generateSavingsChart();
}



function generateSavingsChart() {
  const initialDeposit = parseFloat(document.getElementById('initialDeposit').value);
  const monthlyDeposit = parseFloat(document.getElementById('monthlyDeposit').value);
  const interestRate = parseFloat(document.getElementById('savingsInterestRate').value) / 100; // Convert interest rate to decimal
  const savingsTerm = parseInt(document.getElementById('savingsTerm').value);

  // Perform calculations
  let balance = initialDeposit;
  const data = {
      labels: [],
      datasets: [{
          label: "Savings",
          data: [],
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1
      }]
  };

  for (let i = 1; i <= savingsTerm * 12; i++) { // Multiply by 12 to get total months
      data.labels.push("Month " + i);
      balance += monthlyDeposit; // Add monthly deposit
      balance *= (1 + interestRate / 12); // Compounded monthly
      data.datasets[0].data.push(balance.toFixed(2)); // Round to 2 decimal places and push to data array
  }
  

  // Options for the chart
  const options = {
      scales: {
          y: {
              beginAtZero: true
          }
      }
  };

  // Get the canvas element
  const ctx = document.getElementById('savingsChart').getContext('2d');

  // Generate the chart
  const myChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options
  });
}

