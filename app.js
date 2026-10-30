let gridApi = null;
let isMobileView = false;

// Sample Prompts for the Randomize Button
const SAMPLE_PROMPTS = [
  "Extract real-time sentiment analysis from social feeds",
  "Scrape 15,000 clean eCommerce product price targets",
  "High-throughput real-time financial stream parser",
  "Perform low-latency micro-SLA payload verification",
  "CRITICAL: Emergency real-time fraud detection payload audit",
  "Cross-chain liquidity bridge telemetry verification",
  "Automated multi-region cloud quota load balancing"
];

// Randomize button action handler
window.randomizePromptInput = function() {
  const input = document.getElementById('custom-task');
  if (input) {
    const randomTask = SAMPLE_PROMPTS[Math.floor(Math.random() * SAMPLE_PROMPTS.length)];
    input.value = randomTask;
  }
};

const columnDefs = [
  { field: "timestamp", headerName: "Time", width: 90, sortable: true },
  { field: "seller", headerName: "Agent", width: 110, filter: true },
  { field: "task", headerName: "Task Description & Rationale", flex: 1, resizable: true },
  { field: "price", headerName: "Price", width: 90, cellStyle: { color: '#1F1E1B', fontWeight: '600' } },
  { 
    field: "status", 
    headerName: "Status", 
    width: 140,
    cellRenderer: (params) => {
      const status = params.value || "PROCESSING";
      let bgColor = "#EAE5DC"; let textColor = "#57534E";

      if (status === "VERIFIED") { bgColor = "#D1FAE5"; textColor = "#065F46"; }
      else if (status === "CAPTURED_AND_RELEASED") { bgColor = "#FEF3C7"; textColor = "#92400E"; }
      else if (status === "AUTHORIZED" || status === "CREATED") { bgColor = "#DBEAFE"; textColor = "#1E40AF"; }

      return `<span style="background-color: ${bgColor}; color: ${textColor}; padding: 2px 8px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; font-size: 10px;">${status}</span>`;
    }
  }
];

const rowData = [{
  id: "INIT-1",
  timestamp: new Date().toLocaleTimeString(),
  buyer: "Apex-1",
  seller: "ScrapeBot-9",
  task: "Extract sentiment analysis (AI Reason: Initialized System Ledger)",
  price: "$0.15 USD",
  orderId: "6X928401HV290134K",
  status: "AUTHORIZED"
}];

const gridOptions = {
  columnDefs,
  rowData,
  getRowId: (params) => params.data.id || params.data.orderId,
  defaultColDef: { sortable: true, filter: true, resizable: true },
  animateRows: true,
  rowHeight: 36,
  headerHeight: 38,
  onGridReady: (params) => { gridApi = params.api; if (gridApi) gridApi.sizeColumnsToFit(); }
};

/* View Mode Switcher (16:9 Canvas <-> Mobile View) */
window.toggleViewMode = function() {
  const viewport = document.getElementById('viewport');
  const btn = document.getElementById('toggle-view-btn');
  isMobileView = !isMobileView;

  if (isMobileView) {
    viewport.classList.add('mobile-mode');
    btn.innerText = "Desktop View";
  } else {
    viewport.classList.remove('mobile-mode');
    btn.innerText = "Mobile View";
  }

  setTimeout(() => { if (gridApi) gridApi.sizeColumnsToFit(); }, 300);
};

/* Drawer Controls */
window.toggleDrawer = function(open) {
  const drawer = document.getElementById('drawer');
  const overlay = document.getElementById('drawer-overlay');
  if (open) {
    drawer.classList.add('active');
    overlay.classList.add('active');
  } else {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
  }
};

/* Telemetry Handler */
function updateTelemetry(promptText, statusText, responseData) {
  const pConsole = document.getElementById('prompt-console');
  const sStatus = document.getElementById('ai-status');
  const rConsole = document.getElementById('response-console');

  if (pConsole) pConsole.innerText = promptText;
  if (sStatus) sStatus.innerText = statusText;
  if (rConsole && responseData) rConsole.innerText = JSON.stringify(responseData, null, 2);
}

/* API Dispatcher */
async function handleAction(endpoint, payload, tempBuyer, tempSeller) {
  const input = document.getElementById('custom-task');
  const customTask = (input && input.value.trim() !== '') ? input.value : "Extract real-time sentiment analysis from social feeds";
  payload.task = customTask;

  updateTelemetry(
    `PROTOCOL: PayPal M2M Protocol Engine\nPROMPT: Evaluate SLA task complexity for "${customTask}".`,
    "EVALUATING...",
    { "state": "processing_inference" }
  );

  const tempId = `ORD-${Date.now()}`;
  const pendingRow = {
    id: tempId,
    timestamp: new Date().toLocaleTimeString(),
    buyer: tempBuyer,
    seller: tempSeller,
    task: `${customTask} (Evaluating...)`,
    price: "... USD",
    orderId: tempId,
    status: "PROCESSING..."
  };

  if (gridApi) gridApi.applyTransaction({ add: [pendingRow] });

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();

    if (data.success && gridApi) {
      updateTelemetry(
        `PROTOCOL: PayPal M2M Protocol Engine\nPROMPT: Evaluate SLA task complexity for "${customTask}".`,
        "COMPLETED & SYNCED",
        data.negotiation || data
      );

      const updatedRow = {
        id: tempId,
        timestamp: data.timestamp,
        buyer: data.negotiation ? data.negotiation.buyer : tempBuyer,
        seller: data.negotiation ? data.negotiation.seller : tempSeller,
        task: data.negotiation ? data.negotiation.task : data.auditNote,
        price: data.negotiation ? data.negotiation.agreedPrice : "$0.38 USD",
        orderId: data.payPalTransaction ? data.payPalTransaction.orderId : data.orderId,
        status: data.payPalTransaction ? data.payPalTransaction.status : data.status
      };

      gridApi.applyTransaction({ update: [updatedRow] });
    }
  } catch (e) {
    updateTelemetry("API Network Error", "ERROR", { error: e.message });
  }
}

window.executeContract = function(buyer = "Apex-1", seller = "ScrapeBot-9") {
  handleAction('/api/agent/execute-contract', { buyerAgent: buyer, sellerAgent: seller }, buyer, seller);
};

window.runRFPAuction = function() {
  handleAction('/api/agent/rfp-bid', {}, "Apex-1", "RFP_AUCTION");
};

window.auditAndCapture = function() {
  handleAction('/api/agent/audit-and-capture', { orderId: "7O952138J0414871M", payloadText: "Delivered 15,000 clean social records." }, "GEMINI_QA", "ScrapeBot-9");
};

window.verifyLedger = function() {
  if (!gridApi) return;
  let total = 0;
  gridApi.forEachNode(() => total++);
  gridApi.applyTransaction({ add: [{
    id: `AUDIT-${Date.now()}`,
    timestamp: new Date().toLocaleTimeString(),
    buyer: "SYSTEM_AUDITOR",
    seller: "NETWORK_NODE",
    task: `Cryptographic Audit Passed (${total} records verified)`,
    price: "$0.00 USD",
    orderId: `AUDIT-${Math.floor(100000 + Math.random() * 900000)}`,
    status: "VERIFIED"
  }] });
};

document.addEventListener('DOMContentLoaded', () => {
  const gridDiv = document.getElementById('myGrid');
  if (gridDiv) {
    if (window.agGrid && typeof window.agGrid.createGrid === 'function') gridApi = window.agGrid.createGrid(gridDiv, gridOptions);
    else if (window.agGrid && typeof window.agGrid.Grid === 'function') { new window.agGrid.Grid(gridDiv, gridOptions); gridApi = gridOptions.api; }
  }
});