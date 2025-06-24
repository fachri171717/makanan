
  (function () {
    const orderButtons = document.querySelectorAll('.btn-order, #mainOrderBtn');
    const modal = document.getElementById('orderModal');
    const closeBtn = document.getElementById('closeOrderBtn');
    const form = document.getElementById('orderForm');
    const foodNameInput = document.getElementById('foodName');
    const mainOrderBtn = document.getElementById('mainOrderBtn');

    function toggleModal(open) {
      if (open) {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.getElementById('customerName').focus();
        document.addEventListener('keydown', onKeyDown);
      } else {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        mainOrderBtn && mainOrderBtn.focus();
        document.removeEventListener('keydown', onKeyDown);
      }
    }

    function onKeyDown(e) {
      if (e.key === 'Escape') {
        toggleModal(false);
      }
    }

    orderButtons.forEach((btn) =>
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const foodName = btn.dataset.name 
        foodNameInput.value = foodName;
        toggleModal(true);
      })
    );

    closeBtn.addEventListener('click', () => toggleModal(false));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) toggleModal(false);
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const customerName = form.customerName.value.trim();
      const quantity = form.quantity.value;
      const orderedFood = form.foodName.value;
      const level = form.level.value;
      const message = form.customerMessage.value.trim() || 'Tidak ada pesan khusus';
      alert(
        `Terima kasih, ${customerName}! Pesanan ${quantity}x  ${orderedFood} Level pedas${level} telah diterima.\nPesan khusus: ${message}`
      );
      form.reset();
      toggleModal(false);
    });
  })();