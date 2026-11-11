// Admin Portal & CMS Dashboard Views
const { renderLayout, escapeHtml } = require('./layout');

function renderLoginPage(errorMessage = null) {
  const bodyContent = `
    <section class="section">
      <div class="container">
        <div class="form-container" style="max-width: 450px;">
          <div class="section-tag" style="text-align: center;">STAFF ACCESS</div>
          <h1 class="card-title" style="text-align: center; margin-bottom: 1.5rem;">Admin & CMS Portal</h1>

          ${errorMessage ? `
            <div class="form-status error" style="display: block;">
              ${escapeHtml(errorMessage)}
            </div>
          ` : ''}

          <form method="POST" action="/api/auth/login">
            <div class="form-group">
              <label class="form-label" for="email">Admin Email</label>
              <input type="email" id="email" name="email" class="form-input" required placeholder="admin@nexora.example.com">
            </div>

            <div class="form-group">
              <label class="form-label" for="password">Password</label>
              <input type="password" id="password" name="password" class="form-input" required placeholder="••••••••••••">
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%;">
              Authenticate Session
            </button>
          </form>

          <p style="text-align: center; margin-top: 1.5rem; font-size: 0.85rem; color: var(--color-text-dim);">
            Protected by Session-Based PBKDF2 Authentication & RBAC.
          </p>
        </div>
      </div>
    </section>
  `;
  return renderLayout({ title: 'Admin Login', activeNav: 'admin', bodyContent });
}

function renderAdminDashboard(user, leads = [], articles = []) {
  const newLeadsCount = leads.filter(l => l.status === 'new').length;
  const publishedArticlesCount = articles.filter(a => a.status === 'published').length;

  const bodyContent = `
    <section class="section">
      <div class="container">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
          <div>
            <div class="section-tag">CONTROL PANEL</div>
            <h1 class="section-title">Nexora Operations & Content Console</h1>
            <p style="color: var(--color-text-muted);">
              Signed in as <strong>${escapeHtml(user.email)}</strong> (${escapeHtml(user.role.toUpperCase())})
            </p>
          </div>
          <form method="POST" action="/api/auth/logout">
            <button type="submit" class="btn btn-outline btn-sm">Terminate Session</button>
          </form>
        </div>

        <!-- Metrics Overview -->
        <div class="metrics-grid" style="margin: 2rem 0;">
          <div class="metric-card">
            <div class="metric-val">${leads.length}</div>
            <div class="metric-desc">Total Leads Captured</div>
          </div>
          <div class="metric-card">
            <div class="metric-val" style="color: var(--color-warning);">${newLeadsCount}</div>
            <div class="metric-desc">Pending / New Leads</div>
          </div>
          <div class="metric-card">
            <div class="metric-val" style="color: var(--color-success);">${publishedArticlesCount}</div>
            <div class="metric-desc">Published Insights</div>
          </div>
          <div class="metric-card">
            <div class="metric-val">${articles.length}</div>
            <div class="metric-desc">Total Articles in CMS</div>
          </div>
        </div>

        <!-- Section: Client Leads (Admin Only) -->
        ${user.role === 'admin' ? `
          <div style="margin-top: 3.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <h2 style="font-size: 1.5rem;">Enterprise Consultation Leads</h2>
              <span style="font-size: 0.85rem; color: var(--color-text-dim);">Real-Time Persistent SQLite Queue</span>
            </div>
            
            <table class="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Client Name</th>
                  <th>Email & Company</th>
                  <th>Practice Domain</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${leads.map(lead => `
                  <tr>
                    <td>${lead.created_at ? lead.created_at.split(' ')[0] : 'N/A'}</td>
                    <td><strong>${escapeHtml(lead.full_name)}</strong></td>
                    <td>
                      <div>${escapeHtml(lead.email)}</div>
                      <div style="font-size: 0.85rem; color: var(--color-text-dim);">${escapeHtml(lead.company)}</div>
                    </td>
                    <td><span class="badge badge-new">${escapeHtml(lead.service_interest)}</span></td>
                    <td>
                      <span class="badge ${lead.status === 'new' ? 'badge-new' : 'badge-published'}">
                        ${escapeHtml(lead.status)}
                      </span>
                    </td>
                    <td>
                      <select onchange="updateLeadStatus(${lead.id}, this.value)" class="form-select" style="padding: 0.25rem 0.5rem; font-size: 0.8rem; width: auto;">
                        <option value="new" ${lead.status === 'new' ? 'selected' : ''}>New</option>
                        <option value="contacted" ${lead.status === 'contacted' ? 'selected' : ''}>Contacted</option>
                        <option value="qualified" ${lead.status === 'qualified' ? 'selected' : ''}>Qualified</option>
                        <option value="archived" ${lead.status === 'archived' ? 'selected' : ''}>Archived</option>
                      </select>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        ` : `
          <div style="padding: 1rem; background: rgba(245, 158, 11, 0.1); border: 1px solid var(--color-warning); border-radius: 8px; margin: 2rem 0;">
            Editor role has content editing privileges. Enterprise consultation leads require Admin role clearance.
          </div>
        `}

        <!-- Section: Content Management Workflow -->
        <div style="margin-top: 3.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h2 style="font-size: 1.5rem;">Content Publishing State Machine</h2>
            <span style="font-size: 0.85rem; color: var(--color-text-dim);">Draft &rarr; Under Review &rarr; Published</span>
          </div>

          <table class="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Author</th>
                <th>Status</th>
                <th>Published At</th>
                <th>Governance Action</th>
              </tr>
            </thead>
            <tbody>
              ${articles.map(art => `
                <tr>
                  <td><strong>${escapeHtml(art.title)}</strong></td>
                  <td>${escapeHtml(art.category)}</td>
                  <td>${escapeHtml(art.author)}</td>
                  <td>
                    <span class="badge ${art.status === 'published' ? 'badge-published' : 'badge-draft'}">
                      ${escapeHtml(art.status)}
                    </span>
                  </td>
                  <td>${art.published_at ? art.published_at.split('T')[0] : 'Unpublished'}</td>
                  <td>
                    ${user.role === 'admin' && art.status !== 'published' ? `
                      <form method="POST" action="/api/admin/articles/${art.id}/publish" style="display: inline;">
                        <button type="submit" class="btn btn-primary btn-sm">Authorize & Publish</button>
                      </form>
                    ` : `
                      <span style="color: var(--color-text-dim); font-size: 0.85rem;">Verified</span>
                    `}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `;

  return renderLayout({ title: 'Admin Console', activeNav: 'admin', bodyContent });
}

module.exports = {
  renderLoginPage,
  renderAdminDashboard
};
