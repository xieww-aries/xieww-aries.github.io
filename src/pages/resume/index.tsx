import React, { useEffect } from 'react';

import { education, jobs, profile, skillGroups } from './data';
import './style.scss';

export default function Resume() {
	useEffect(() => {
		const previous = document.title;
		document.title = `${profile.name} · ${profile.title}`;
		return () => {
			document.title = previous;
		};
	}, []);

	return (
		<div styleName="page">
			<section styleName="hero">
				<div styleName="identity">
					<p styleName="eyebrow">Resume</p>
					<h1 styleName="name">{profile.name}</h1>
					<p styleName="role">
						<span>{profile.title}</span>
						<span styleName="dot" />
						<span>{profile.location}</span>
						<span styleName="dot" />
						<span>{profile.years}</span>
					</p>
					<p styleName="status">{profile.status}</p>
					<ul styleName="intent">
						<li>{profile.intent.type}</li>
						<li>{profile.intent.role}</li>
					</ul>
				</div>
				<div styleName="aside">
					<ul styleName="contacts">
						<li>
							<span>邮箱</span>
							<a href={`mailto:${profile.email}`}>{profile.email}</a>
						</li>
						<li>
							<span>电话</span>
							<a href={`tel:${profile.phone}`}>{profile.phone}</a>
						</li>
						<li>
							<span>地点</span>
							<em>{profile.location}</em>
						</li>
					</ul>
					<div styleName="actions">
						<a styleName="primary" href="/static/resume.pdf" download="谢伟伟-简历.pdf">
							下载 PDF
						</a>
						<button type="button" styleName="ghost" onClick={() => window.print()}>
							打印
						</button>
					</div>
				</div>
			</section>

			<section styleName="section">
				<h2 styleName="heading">技术栈</h2>
				<div styleName="skills">
					{skillGroups.map(group => (
						<div key={group.label} styleName="skill-group">
							<p styleName="skill-label">{group.label}</p>
							<ul styleName="tags">
								{group.items.map(item => (
									<li key={item}>{item}</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</section>

			<section styleName="section">
				<h2 styleName="heading">工作经历</h2>
				<ol styleName="timeline">
					{jobs.map(job => (
						<li key={job.company} styleName="job">
							<div styleName="job-head">
								<div>
									<h3 styleName="company">{job.company}</h3>
									<p styleName="job-title">{job.title}</p>
								</div>
								<p styleName="period">{job.period}</p>
							</div>
							<ul styleName="summary">
								{job.summary.map(item => (
									<li key={item}>{item}</li>
								))}
							</ul>
							{job.projects.map(project => (
								<article key={project.name} styleName="project">
									<div styleName="project-head">
										<div>
											<h4 styleName="project-name">{project.name}</h4>
											{project.summary ? <p styleName="project-summary">{project.summary}</p> : null}
										</div>
										<p styleName="period">{project.period}</p>
									</div>
									<ul styleName="tags">
										{project.stack.map(item => (
											<li key={item}>{item}</li>
										))}
									</ul>
									<ul styleName="highlights">
										{project.highlights.map(item => (
											<li key={item}>{item}</li>
										))}
									</ul>
								</article>
							))}
						</li>
					))}
				</ol>
			</section>

			<section styleName="section">
				<h2 styleName="heading">教育背景</h2>
				<div styleName="edu">
					<div>
						<h3 styleName="company">{education.school}</h3>
						<p styleName="job-title">
							<span>{education.major}</span>
							<span styleName="dot" />
							<span>{education.degree}</span>
						</p>
					</div>
					<p styleName="period">{education.period}</p>
				</div>
			</section>
		</div>
	);
}
