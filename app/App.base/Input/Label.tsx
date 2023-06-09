import React from 'react';

interface Props {
	required?: boolean;
	htmlFor: string;
	content: string;
	className?: string;
}
function Label({ required, htmlFor, content, className }: Props) {
	return (
		<label htmlFor={htmlFor} className={`text-body5-mo pc:text-body5-pc ${className ?? ''}`}>
			{content} {required && <span className="font-semibold text-primaryOrange-200 ">*</span>}
		</label>
	);
}

export default Label;
