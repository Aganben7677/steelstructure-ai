(function () {
  const root = document.getElementById('knowledge-notes');
  if (!root) return;
  const notes = [
    { id: 'scope', title: ['Scope & document control', '范围与文件管理'], summary: ['Resolve scope boundaries before building the estimate.', '报价前先厘清供货边界与文件依据。'],
      checks: [
        ['List inquiry drawings, specifications, revisions and addenda in one register.', '汇总询价图纸、技术规格书、版本号及补遗，形成统一文件清单。'],
        ['Identify who owns connection design, detailing, temporary works and site installation.', '明确连接设计、深化、临时工程及现场安装分别由谁负责。'],
        ['Record conflicts between drawings, quantities and specifications for client clarification.', '记录图纸、工程量及规格书之间的冲突，提交客户澄清。']],
      output: ['Scope matrix, document register and exclusions list.', '范围矩阵、文件清单和报价除外项。'],
      question: ['Please confirm the governing document revision and the responsibility for connection design.', '请确认报价依据的文件版本及连接设计责任方。'] },
    { id: 'materials', title: ['Materials & quantities', '材料与工程量'], summary: ['Keep grade, delivery condition and quantity assumptions traceable.', '让牌号、交货状态和工程量假设有据可查。'],
      checks: [
        ['Record the specified grade, product standard, edition, thickness range and delivery condition.', '记录指定牌号、产品标准及版本、厚度范围与交货状态。'],
        ['Ask whether impact testing, additional testing, inspection certificates or approved mills are required.', '确认冲击试验、附加试验、检验证书和合格钢厂名录的要求。'],
        ['Separate net drawing weight from purchasing allowance; record proposed substitutions for approval.', '区分图纸净重与采购余量；拟代用材料单列报批。']],
      output: ['Material register, quantity basis and substitution register.', '材料清单、工程量依据与材料代用台账。'],
      question: ['Is a proposed alternative material acceptable, and what evidence and approval are required?', '拟代用材料是否可接受？需提供哪些证明并履行何种审批？'] },
    { id: 'bolting', title: ['Bolting & connections', '螺栓与连接'], summary: ['Review bolt assemblies as a complete procurement package.', '将螺栓连接副作为完整采购包核对。'],
      checks: [
        ['Record the specified bolt system, grade, diameter, length, nuts and washers.', '记录指定的螺栓体系、等级、直径、长度以及螺母和垫圈配置。'],
        ['Confirm joint type, installation requirements, coating and mating-surface requirements with the designer.', '向设计方确认连接类型、安装要求、表面处理及接触面要求。'],
        ['Allocate supply, spare quantities, testing and installation records between shop and site teams.', '明确工厂与现场的供货、备品数量、试验及安装记录责任。']],
      output: ['Bolt schedule and shop/site responsibility matrix.', '螺栓明细表及工厂与现场责任矩阵。'],
      question: ['Please confirm the required bolt assembly and the party responsible for installation verification.', '请确认连接副配置及安装验证责任方。'] },
    { id: 'welding', title: ['Welding & examination', '焊接与检测'], summary: ['Identify qualification and examination needs before production.', '生产前识别工艺评定与检测需求。'],
      checks: [
        ['Record the contractual welding code, edition, weld details and acceptance criteria.', '记录合同焊接规范及版本、焊缝细节与验收准则。'],
        ['Have the welding coordinator review procedure and personnel qualification coverage.', '由焊接负责人核查工艺及人员资格的覆盖范围。'],
        ['Confirm examination methods, extent, inspection access, repair process and record requirements.', '确认检测方法、范围、检测可达性、返修流程与记录要求。']],
      output: ['Weld review register and a priced examination scope.', '焊缝审查台账及计入报价的检测范围。'],
      question: ['Please confirm examination extent and acceptance criteria for each weld category.', '请按焊缝类别确认检测范围与验收准则。'] },
    { id: 'coating', title: ['Coating & fireproofing', '防腐与防火'], summary: ['Resolve coating interfaces and inspection scope together.', '同步澄清涂层接口与检验范围。'],
      checks: [
        ['Request the approved system, surface preparation, layer thicknesses and inspection requirements.', '索取批准的涂装体系、表面处理、各层厚度与检验要求。'],
        ['Confirm interface requirements for galvanizing, contact surfaces, site welds and fireproofing.', '确认镀锌、连接接触面、现场焊口与防火层的接口要求。'],
        ['Assign responsibility for masking, transport damage, site touch-up and final records.', '明确遮蔽、运输损伤、现场修补与最终记录的责任。']],
      output: ['Coating schedule, area basis and shop/site split.', '涂装明细、面积计算依据及工厂与现场分工。'],
      question: ['Which coating and fireproofing system is approved, and who owns site touch-up?', '批准采用哪种防腐与防火体系？现场修补由谁负责？'] },
    { id: 'fabrication', title: ['Fabrication & assembly', '制作与预拼装'], summary: ['Connect drawing release dates with the production sequence.', '将图纸放行时间与生产顺序对应起来。'],
      checks: [
        ['Confirm detailing deliverables, approval stages and release dates by shipment lot.', '按发运批次确认深化交付物、审批节点与图纸放行日期。'],
        ['Identify trial assembly scope, dimensional acceptance and client witness requirements.', '明确预拼装范围、尺寸验收与客户见证要求。'],
        ['Review member sizes, handling constraints and outsourced work with the production team.', '与生产团队核查构件尺寸、搬运限制及外协范围。']],
      output: ['Production assumptions, assembly plan and release milestones.', '生产假设、预拼装计划及放行里程碑。'],
      question: ['Which assemblies require trial fit-up and client witnessing before shipment?', '哪些组件发运前需要预拼装及客户见证？'] },
    { id: 'inspection', title: ['Inspection & traceability', '检验与可追溯性'], summary: ['Plan the evidence needed to release each shipment.', '提前规划每批发运放行所需的证明文件。'],
      checks: [
        ['Agree inspection and test plan stages, hold points, witness points and notice periods.', '确认检验试验计划的阶段、停检点、见证点及通知期限。'],
        ['Define how heat numbers and material certificates remain linked to fabricated members.', '明确炉批号、材料证书与成品构件的关联方式。'],
        ['Confirm document dossier contents, nonconformance closure and release authority.', '确认竣工资料内容、不符合项关闭流程及放行权限。']],
      output: ['Draft ITP, traceability matrix and dossier index.', 'ITP 草案、追溯矩阵及交工资料目录。'],
      question: ['Please confirm the dossier index and records required for shipment release.', '请确认交工资料目录及发运放行所需记录。'] },
    { id: 'logistics', title: ['Packing & delivery', '包装与交付'], summary: ['Make the delivery interface part of the tender review.', '将交付接口纳入投标审查。'],
      checks: [
        ['Confirm the delivery term, named place, required dates and responsibility for each transport leg.', '确认交付条款、指定地点、要求日期与各运输区段的责任。'],
        ['Record package size and weight limits, shipping marks, protection and unloading constraints.', '记录包装尺寸与重量限制、唛头、防护及卸货限制。'],
        ['Assign engineered lifting and transport arrangements to the responsible specialists.', '明确吊装及运输专项方案的专业责任方。']],
      output: ['Packing assumptions, shipment lots and delivery responsibility matrix.', '包装假设、发运批次及交付责任矩阵。'],
      question: ['Please confirm delivery location, unloading responsibility and maximum permitted package dimensions.', '请确认交付地点、卸货责任与包装尺寸限制。'] }
  ];
  const input = document.getElementById('knowledge-search');
  const count = document.getElementById('knowledge-count');
  const index = document.getElementById('knowledge-index');
  const pick = value => value[currentLang === 'zh' ? 1 : 0];
  function element(tag, value, parent) {
    const el = document.createElement(tag);
    if (value) el.textContent = value;
    if (parent) parent.append(el);
    return el;
  }
  function filter() {
    const query = input.value.trim().toLocaleLowerCase();
    let visible = 0;
    notes.forEach(note => {
      const match = JSON.stringify(note).toLocaleLowerCase().includes(query);
      document.getElementById(note.id).hidden = !match;
      if (match) visible++;
    });
    count.textContent = currentLang === 'zh' ? `${visible} / ${notes.length} 篇实务笔记` : `${visible} / ${notes.length} practical notes`;
    document.getElementById('knowledge-empty').hidden = visible !== 0;
  }
  function openHash() {
    const note = notes.find(item => '#' + item.id === location.hash);
    if (!note) return;
    input.value = '';
    filter();
    const detail = document.getElementById(note.id);
    detail.open = true;
    detail.scrollIntoView({ block: 'start' });
  }
  function render() {
    const opened = new Set([...root.querySelectorAll('details[open]')].map(el => el.id));
    root.replaceChildren();
    index.replaceChildren();
    notes.forEach((note, position) => {
      const link = element('a', pick(note.title), index);
      link.href = '#' + note.id;
      const detail = element('details', '', root);
      detail.id = note.id;
      detail.open = opened.has(note.id);
      const summary = element('summary', '', detail);
      element('span', String(position + 1).padStart(2, '0'), summary).className = 'note-number';
      element('span', pick(note.title), summary);
      const body = element('div', '', detail);
      body.className = 'note-body';
      element('p', pick(note.summary), body);
      element('h2', pick(['Review points', '核对要点']), body);
      const list = element('ul', '', body);
      note.checks.forEach(check => element('li', pick(check), list));
      element('h2', pick(['Working documents', '整理成果']), body);
      element('p', pick(note.output), body);
      element('h2', pick(['Clarification example', '澄清示例']), body);
      element('blockquote', pick(note.question), body);
      const resource = element('a', pick(['Tender review templates', '投标审查模板']), body);
      resource.href = 'resources.html#templates';
    });
    filter();
  }
  input.addEventListener('input', filter);
  window.addEventListener('site-language-change', render);
  window.addEventListener('hashchange', openHash);
  index.addEventListener('click', event => {
    if (event.target.closest('a')?.hash === location.hash) openHash();
  });
  render();
  if (location.hash) requestAnimationFrame(openHash);
})();
