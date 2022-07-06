<?xml version="1.0" encoding="windows-1251"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	<xsl:output method="html"></xsl:output>
	<xsl:template match="/">
		<html>
		<head>
			<title>Êîíòðîëåð ptnAtTreeSolution.XML+XSLT+JS(T.Duffy)</title>
			<link rel="stylesheet" type="text/css" href="xmlTree.css"/>
			<script type="text/javascript" src="xmlTree.js"></script>
		</head>
			<xsl:apply-templates/>
		</html>
	</xsl:template>
	<xsl:template match="tree">
		<body>
			<xsl:apply-templates/>
		</body>
	</xsl:template>
	<xsl:template match="branch">
		<span class="trigger">
			<xsl:attribute name="onClick">
				showBranch('<xsl:value-of select="@id"/>');
			</xsl:attribute>
			<img src="images/ico_01.gif">
				<xsl:attribute name="id">I<xsl:value-of select="@id"/></xsl:attribute>
			</img>
			<xsl:value-of select="branchText"/>
			<br/>
		</span>
		<span class="branch">
			<xsl:attribute name="id">
				<xsl:value-of select="@id"/>
			</xsl:attribute>
			<xsl:apply-templates/>
		</span>
	</xsl:template>
	<xsl:template match="leaf">
		<img>
			<xsl:choose>
				<xsl:when test="ImageIndex=9">
					<xsl:attribute name="src">images/ico_09.gif</xsl:attribute>
				</xsl:when>
				<xsl:when test="ImageIndex=10">
					<xsl:attribute name="src">images/ico_10.gif</xsl:attribute>
				</xsl:when>
				<xsl:when test="ImageIndex=11">
					<xsl:attribute name="src">images/ico_11.gif</xsl:attribute>
				</xsl:when>
				<xsl:when test="ImageIndex=12">
					<xsl:attribute name="src">images/ico_12.gif</xsl:attribute>
				</xsl:when>
				<xsl:otherwise>
					<xsl:attribute name="src">images/ico_24.gif</xsl:attribute>
				</xsl:otherwise>
			</xsl:choose>
		</img>
		<a>
			<xsl:attribute name="onClick">
					testAlert();
			</xsl:attribute>
<!-- 			<xsl:attribute name="href" >
				
				
				<xsl:value-of select="link"/>
			</xsl:attribute> -->
			<xsl:attribute name="link" >
				<xsl:value-of select="link"/>
			</xsl:attribute>
			<xsl:attribute name="type" >
				<xsl:value-of select="type"/>
			</xsl:attribute>
			<xsl:value-of select="leafText"/>
		</a><br/>
	</xsl:template>
	<!-- avoid output of text node with default template / çàïîá³ãàííÿ âèâîäó òåêñòó âóçëà ç øàáëîíîì çà çàìîâ÷óâàííÿì -->
	<xsl:template match="branchText"/>
	<!-- avoid output of description node (branchDescription) with default template / çàïîá³ãàííÿ âèâîäó îïèñó âóçëà ç øàáëîíîì çà çàìîâ÷óâàííÿì -->
	<xsl:template match="branchDescription"/>
	<!-- avoid output of ImageIndex node with default template / çàïîá³ãàííÿ âèâîäó ³íäåêñà ï³êòîãðàìè âóçëà ç øàáëîíîì çà çàìîâ÷óâàííÿì -->
	<xsl:template match="ImageIndex"/>
	<!-- avoid output of Frame node with default template  / çàïîá³ãàííÿ âèâîäó ôðåéìó âóçëà ç øàáëîíîì çà çàìîâ÷óâàííÿì -->
	<xsl:template match="Frame"/>
	<!-- avoid output of link node with default template  / çàïîá³ãàííÿ âèâîäó ïîñèëàííÿ âóçëà ç øàáëîíîì çà çàìîâ÷óâàííÿì -->
	<xsl:template match="link"/>
</xsl:stylesheet>
