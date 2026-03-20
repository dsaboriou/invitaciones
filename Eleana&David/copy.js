document.addEventListener('DOMContentLoaded', () => {
    const copyButtons = document.querySelectorAll('.copy-btn');

    copyButtons.forEach(button => {
        button.addEventListener('click', async function () {
            const accountId = this.getAttribute('data-account');
            const accountElement = document.getElementById(accountId);
            const accountNumber = accountElement.textContent;

            // Get the feedback element (same account ID with 'feedback-' prefix)
            const feedbackId = 'feedback-' + accountId.split('-')[1];
            const feedbackElement = document.getElementById(feedbackId);

            try {
                // Copy to clipboard
                await navigator.clipboard.writeText(accountNumber);

                // Show confirmation
                feedbackElement.textContent = '✓ Copiado';
                feedbackElement.style.opacity = '1';

                // Hide after 2 seconds
                setTimeout(() => {
                    feedbackElement.style.opacity = '0';
                }, 2000);

            } catch (err) {
                console.error('Error al copiar:', err);
                feedbackElement.textContent = 'Error al copiar';
                feedbackElement.style.opacity = '1';

                setTimeout(() => {
                    feedbackElement.style.opacity = '0';
                }, 2000);
            }
        });
    });
});
